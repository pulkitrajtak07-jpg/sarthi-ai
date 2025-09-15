import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "text/plain",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Invalid file type. Please upload PDF, DOCX, DOC, JPG, PNG, or TXT files." },
        { status: 400 },
      )
    }

    // Validate file size (10MB limit)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ success: false, error: "File size exceeds 10MB limit" }, { status: 400 })
    }

    // Extract text from file
    let resumeText = ""

    try {
      if (file.type === "text/plain") {
        resumeText = await file.text()
      } else if (file.type === "application/pdf") {
        // Simulate PDF text extraction - in production, use pdf-parse
        resumeText = `
JOHN SMITH
Software Engineer | Full Stack Developer
Email: john.smith@email.com | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johnsmith | GitHub: github.com/johnsmith

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with 5+ years of expertise in React, Node.js, and cloud technologies. 
Proven track record of delivering scalable web applications and leading development teams.

TECHNICAL SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS
• Backend: Node.js, Express.js, Python, Django, REST APIs
• Databases: PostgreSQL, MongoDB, Redis
• Cloud: AWS, Docker, Kubernetes, CI/CD
• Tools: Git, Jest, Webpack, Figma

PROFESSIONAL EXPERIENCE

Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Led development of customer-facing web application serving 100K+ users
• Improved application performance by 40% through code optimization
• Mentored 3 junior developers and established coding standards
• Implemented automated testing reducing bugs by 60%

Software Engineer | StartupXYZ | 2019 - 2021
• Built RESTful APIs handling 1M+ requests daily
• Developed responsive frontend components using React
• Collaborated with cross-functional teams in Agile environment
• Reduced deployment time by 50% through CI/CD implementation

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2015 - 2019
GPA: 3.8/4.0

PROJECTS
• E-commerce Platform: Built full-stack application with React and Node.js
• Task Management App: Developed mobile-responsive web app with real-time updates
• Open Source Contributor: Contributed to 5+ popular GitHub repositories

CERTIFICATIONS
• AWS Certified Solutions Architect
• Google Cloud Professional Developer
        `
      } else if (file.type.includes("image")) {
        // For images, extract text using OCR simulation
        resumeText = `
SARAH JOHNSON
Product Manager | Digital Strategy Expert
Email: sarah.johnson@email.com | Phone: (555) 987-6543
LinkedIn: linkedin.com/in/sarahjohnson

PROFESSIONAL SUMMARY
Results-driven Product Manager with 6+ years of experience in digital product development, 
user experience optimization, and cross-functional team leadership.

CORE COMPETENCIES
• Product Strategy & Roadmap Development
• User Experience (UX) Design & Research
• Data Analysis & Market Research
• Agile/Scrum Methodologies
• Stakeholder Management
• A/B Testing & Conversion Optimization

PROFESSIONAL EXPERIENCE

Senior Product Manager | InnovateTech | 2020 - Present
• Managed product portfolio generating $5M+ annual revenue
• Increased user engagement by 75% through feature optimization
• Led cross-functional team of 12 members across design, engineering, and marketing
• Launched 3 major product features ahead of schedule

Product Manager | GrowthCorp | 2018 - 2020
• Conducted market research and competitive analysis for new product initiatives
• Improved conversion rates by 45% through user journey optimization
• Collaborated with engineering teams to deliver 15+ product releases
• Established product metrics and KPI tracking systems

EDUCATION
Master of Business Administration (MBA)
Business School | 2016 - 2018

Bachelor of Arts in Marketing
State University | 2012 - 2016
        `
      } else {
        // For DOCX/DOC files, simulate text extraction
        resumeText = await file.text()
      }
    } catch (extractError) {
      console.error("Text extraction error:", extractError)
      return NextResponse.json(
        {
          success: false,
          error: "Failed to extract text from file. Please try another file format.",
        },
        { status: 400 },
      )
    }

    // Generate mock analysis
    const mockAnalysis = {
      overallScore: 78,
      atsScore: 72,
      strengths: [
        "Professional formatting detected",
        "Contact information appears complete",
        "Work experience section present",
        "Education section included",
      ],
      weaknesses: [
        "Could benefit from more quantified achievements",
        "May need additional industry keywords",
        "Summary section could be strengthened",
        "Skills section could be expanded",
      ],
      suggestions: [
        "Add specific metrics and numbers to your achievements",
        "Include more industry-relevant keywords for ATS optimization",
        "Strengthen your professional summary with a clear value proposition",
        "Expand your skills section with both technical and soft skills",
        "Use action verbs to start bullet points in experience section",
      ],
      keywordOptimization: {
        missing: ["leadership", "project management", "data analysis", "team collaboration", "problem solving"],
        present: ["experience", "skills", "education", "professional", "work"],
      },
      sections: {
        contact: { score: 85, feedback: "Contact information appears complete and professional" },
        summary: {
          score: 65,
          feedback: "Summary section could be more compelling and specific to your value proposition",
        },
        experience: {
          score: 75,
          feedback: "Experience section is present but could benefit from more quantified achievements",
        },
        education: { score: 80, feedback: "Education section is well-formatted and complete" },
        skills: { score: 70, feedback: "Skills section could include more technical and industry-specific skills" },
      },
      industryRelevance: 72,
      improvementPriority: [
        "Add quantified achievements with specific numbers and percentages",
        "Include more industry-relevant keywords for better ATS compatibility",
        "Strengthen professional summary to highlight unique value proposition",
      ],
    }

    return NextResponse.json({
      success: true,
      data: {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        analysis: mockAnalysis,
        extractedText: resumeText.substring(0, 500) + "...", // First 500 chars for preview
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Resume analysis error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to analyze resume",
      },
      { status: 500 },
    )
  }
}
