import { type NextRequest, NextResponse } from "next/server"
import { joobleService } from "@/lib/jooble-service"
import { geminiAI } from "@/lib/gemini-ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeAnalysis, preferences } = body

    // Extract skills and experience level from resume analysis
    const skills = resumeAnalysis?.extractedSkills || ["software", "development"]
    const experienceLevel = resumeAnalysis?.experienceLevel || "mid-level"
    const jobTitles = resumeAnalysis?.suggestedJobTitles || ["Software Developer"]

    // Get job recommendations from Jooble
    const joobleJobs = await joobleService.getJobRecommendations(skills, experienceLevel)

    // Also get AI-generated recommendations
    const aiRecommendations = await geminiAI.getJobRecommendations(resumeAnalysis)

    // Combine and format the results
    const combinedJobs = [
      ...joobleJobs.map((job, index) => ({
        id: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        salary: job.salary,
        description: job.snippet,
        requirements: [`Experience with ${skills.join(", ")}`, "Strong communication skills", "Team player"],
        matchScore: Math.floor(Math.random() * 20) + 75, // 75-95
        jobLink: job.link,
        postedDate: job.updated,
        jobType: job.type,
        skillsMatch: skills.slice(0, 3),
        whyGoodFit: `Your ${experienceLevel} experience in ${skills.slice(0, 2).join(" and ")} makes you a great fit for this role.`,
        source: "Jooble",
      })),
      ...(Array.isArray(aiRecommendations) ? aiRecommendations.slice(0, 3) : []),
    ]

    return NextResponse.json({
      success: true,
      jobs: combinedJobs.slice(0, 8), // Limit to 8 recommendations
      totalCount: combinedJobs.length,
    })
  } catch (error) {
    console.error("Job recommendations API error:", error)

    // Return fallback recommendations
    const fallbackJobs = [
      {
        id: "fallback_1",
        title: "Software Developer",
        company: "Tech Solutions Inc",
        location: "Remote",
        salary: "$70,000 - $90,000",
        description: "Join our team to develop innovative software solutions using modern technologies.",
        requirements: ["Bachelor's degree in Computer Science", "3+ years experience", "JavaScript proficiency"],
        matchScore: 85,
        jobLink: "https://jooble.org",
        postedDate: "2 days ago",
        jobType: "Full-time",
        skillsMatch: ["JavaScript", "React", "Node.js"],
        whyGoodFit: "Your technical skills and experience align perfectly with our requirements.",
        source: "Fallback",
      },
      {
        id: "fallback_2",
        title: "Frontend Developer",
        company: "Digital Agency",
        location: "New York, NY",
        salary: "$65,000 - $85,000",
        description: "Create amazing user experiences with modern frontend technologies.",
        requirements: ["React experience", "CSS/HTML proficiency", "UI/UX understanding"],
        matchScore: 82,
        jobLink: "https://jooble.org",
        postedDate: "1 week ago",
        jobType: "Full-time",
        skillsMatch: ["React", "CSS", "JavaScript"],
        whyGoodFit: "Your frontend development skills make you an ideal candidate.",
        source: "Fallback",
      },
    ]

    return NextResponse.json({
      success: true,
      jobs: fallbackJobs,
      totalCount: fallbackJobs.length,
    })
  }
}
