import { type NextRequest, NextResponse } from "next/server"
import { generateResumeContent } from "@/lib/openai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jobTitle, experience, skills } = body

    if (!jobTitle || !experience || !skills) {
      return NextResponse.json({ error: "Job title, experience level, and skills are required" }, { status: 400 })
    }

    const content = await generateResumeContent(jobTitle, experience, skills)

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error in generate-resume API:", error)
    return NextResponse.json({ error: "An error occurred while generating resume content" }, { status: 500 })
  }
}
