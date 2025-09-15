import { type NextRequest, NextResponse } from "next/server"
import { geminiAI } from "@/lib/gemini-ai-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const response = await geminiAI.generateText(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Gemini Chat API error:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
