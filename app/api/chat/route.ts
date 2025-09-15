import { type NextRequest, NextResponse } from "next/server"
import { combinedAI } from "@/lib/combined-ai-service"
import { fallbackChat } from "@/lib/fallback-chat-service"

export async function POST(request: NextRequest) {
  try {
    const { message, userId } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    // Create context based on user
    const context = userId && userId !== "anonymous" ? `User ID: ${userId}. ` : "Anonymous user. "

    let response: string

    try {
      // Try to get response from combined AI service
      response = await combinedAI.getChatResponse(message, context)

      // If response indicates API issues, use fallback
      if (response.includes("API configuration issues") || response.includes("technical difficulties")) {
        response = fallbackChat.getChatResponse(message)
      }
    } catch (error) {
      console.error("AI service failed, using fallback:", error)
      // Use fallback chat service
      response = fallbackChat.getChatResponse(message)
    }

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      {
        error: "Failed to process chat message",
        response: "I'm sorry, I'm experiencing technical difficulties. Please try again later.",
      },
      { status: 500 },
    )
  }
}
