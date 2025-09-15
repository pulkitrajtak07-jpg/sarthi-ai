import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// Check if we're in a preview environment
const isPreviewEnvironment = () => {
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development" ||
    (typeof window !== "undefined" && window.location.hostname === "localhost")
  )
}

export async function analyzeResumeWithOpenAI(resumeText: string) {
  if (isPreviewEnvironment()) {
    // Return mock data in preview environments
    return mockAnalysis
  }

  try {
    const prompt = `
      You are an expert resume reviewer. Analyze the following resume and provide:
      1. An overall score out of 10
      2. Strengths (3-5 points)
      3. Areas for improvement (3-5 points)
      4. Specific recommendations for improvement
      5. Keywords that are relevant for ATS systems

      Resume:
      ${resumeText}

      Format your response as JSON with the following structure:
      {
        "score": number,
        "strengths": string[],
        "improvements": string[],
        "recommendations": string[],
        "keywords": string[]
      }
    `

    const { text } = await generateText({
      model: openai("gpt-4o", {
        apiKey:
          "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",
      }),
      prompt,
      temperature: 0.7,
      maxTokens: 1000,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error analyzing resume with OpenAI:", error)
    return mockAnalysis
  }
}

export async function generateResumeContent(jobTitle: string, experience: string, skills: string[]) {
  if (isPreviewEnvironment()) {
    // Return mock data in preview environments
    return mockResumeContent
  }

  try {
    const prompt = `
      You are an expert resume writer. Generate professional resume content for a ${jobTitle} with the following:
      
      Experience level: ${experience}
      Skills: ${skills.join(", ")}
      
      Generate:
      1. A professional summary (2-3 sentences)
      2. 3 bullet points for work experience achievements
      3. A skills section with 6-8 relevant technical and soft skills
      
      Format your response as JSON with the following structure:
      {
        "summary": string,
        "achievements": string[],
        "skills": string[]
      }
    `

    const { text } = await generateText({
      model: openai("gpt-4o", {
        apiKey:
          "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",
      }),
      prompt,
      temperature: 0.7,
      maxTokens: 800,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating resume content with OpenAI:", error)
    return mockResumeContent
  }
}

// Mock data for preview environments
const mockAnalysis = {
  score: 7.5,
  strengths: [
    "Clear and organized structure",
    "Quantifiable achievements included",
    "Relevant technical skills highlighted",
    "Good use of action verbs",
  ],
  improvements: [
    "Professional summary could be more impactful",
    "Some bullet points are too lengthy",
    "Missing keywords relevant to the target industry",
    "Education section needs more details",
  ],
  recommendations: [
    "Add a stronger professional summary that highlights your unique value proposition",
    "Keep bullet points concise (1-2 lines each)",
    "Include more industry-specific keywords to pass ATS systems",
    "Add relevant certifications or continuing education",
    "Quantify more achievements with specific metrics and results",
  ],
  keywords: [
    "project management",
    "team leadership",
    "strategic planning",
    "data analysis",
    "client relations",
    "process improvement",
    "cross-functional collaboration",
  ],
}

const mockResumeContent = {
  summary:
    "Results-driven software developer with a strong foundation in full-stack development and a passion for creating efficient, scalable solutions. Experienced in agile environments with a proven track record of delivering high-quality applications that meet business objectives and enhance user experience.",
  achievements: [
    "Developed and implemented a new customer portal that increased user engagement by 45% and reduced support tickets by 30% within three months of launch.",
    "Led a team of 5 developers to successfully migrate legacy systems to modern cloud architecture, resulting in 60% improved performance and $200K annual cost savings.",
    "Optimized database queries and implemented caching strategies that reduced application load time by 75%, significantly improving user satisfaction scores.",
  ],
  skills: [
    "JavaScript/TypeScript",
    "React.js",
    "Node.js",
    "SQL/NoSQL Databases",
    "RESTful API Design",
    "Cloud Services (AWS/Azure)",
    "Agile Methodologies",
    "Problem-solving",
  ],
}
