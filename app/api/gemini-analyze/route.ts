import { type NextRequest, NextResponse } from "next/server"
import { geminiAI } from "@/lib/gemini-ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resumeText } = body

    if (!resumeText) {
      return NextResponse.json({ error: "Resume text is required" }, { status: 400 })
    }

    const analysis = await geminiAI.analyzeResume(resumeText)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Resume Analysis API error:", error)
    return NextResponse.json({ error: "Failed to analyze resume" }, { status: 500 })
  }
}
