"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { geminiAI } from "@/lib/gemini-ai-service"
import { Loader2, Send, User, Bot, Sparkles } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  image?: string
}

export default function AIChatAssistant({ resumeData }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "👋 Hi there! I'm Sarthi AI, your intelligent resume assistant! ✨\n\nI can help you:\n🔍 Improve your resume content\n💡 Suggest better descriptions\n📝 Write compelling summaries\n🎯 Optimize for ATS systems\n💼 Career advice and tips\n\nHow can I help you today? 😊",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=200&fit=crop&crop=center",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const getContextualResponse = (userMessage: string, context: string) => {
    const lowerMessage = userMessage.toLowerCase()

    // Add contextual emojis and images based on message content
    if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
      return {
        emoji: "📄",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=250&h=150&fit=crop&crop=center",
      }
    } else if (lowerMessage.includes("job") || lowerMessage.includes("career")) {
      return {
        emoji: "💼",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=150&fit=crop&crop=center",
      }
    } else if (lowerMessage.includes("skill") || lowerMessage.includes("experience")) {
      return {
        emoji: "🎯",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=250&h=150&fit=crop&crop=center",
      }
    } else if (lowerMessage.includes("interview")) {
      return {
        emoji: "🤝",
        image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=250&h=150&fit=crop&crop=center",
      }
    } else if (lowerMessage.includes("salary") || lowerMessage.includes("money")) {
      return {
        emoji: "💰",
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=250&h=150&fit=crop&crop=center",
      }
    } else if (lowerMessage.includes("help") || lowerMessage.includes("advice")) {
      return {
        emoji: "💡",
        image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=250&h=150&fit=crop&crop=center",
      }
    } else if (lowerMessage.includes("template") || lowerMessage.includes("design")) {
      return {
        emoji: "🎨",
        image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=250&h=150&fit=crop&crop=center",
      }
    } else if (lowerMessage.includes("ats") || lowerMessage.includes("system")) {
      return {
        emoji: "🤖",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=250&h=150&fit=crop&crop=center",
      }
    }

    return {
      emoji: "✨",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=250&h=150&fit=crop&crop=center",
    }
  }

  const enhanceResponse = (response: string, userMessage: string) => {
    const { emoji, image } = getContextualResponse(userMessage, "")

    // Add emojis to the response
    let enhancedResponse = `${emoji} ${response}`

    // Add helpful tips based on context
    if (userMessage.toLowerCase().includes("resume")) {
      enhancedResponse +=
        "\n\n💡 **Pro Tip:** Keep your resume to 1-2 pages and use action verbs to start each bullet point! 🚀"
    } else if (userMessage.toLowerCase().includes("interview")) {
      enhancedResponse +=
        "\n\n🎯 **Interview Tip:** Research the company beforehand and prepare specific examples using the STAR method! ⭐"
    } else if (userMessage.toLowerCase().includes("skill")) {
      enhancedResponse +=
        "\n\n🚀 **Skills Tip:** Include both hard and soft skills, and quantify your achievements whenever possible! 📊"
    } else if (userMessage.toLowerCase().includes("job")) {
      enhancedResponse +=
        "\n\n💼 **Job Search Tip:** Tailor your resume for each application and use keywords from the job description! 🎯"
    } else if (userMessage.toLowerCase().includes("salary")) {
      enhancedResponse +=
        "\n\n💰 **Salary Tip:** Research market rates and be prepared to negotiate based on your value proposition! 📈"
    }

    // Add encouraging closing
    enhancedResponse +=
      "\n\nIs there anything specific you'd like me to help you with? I'm here to support your career journey! 🌟"

    return { enhancedResponse, image }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    try {
      // Create context from resume data
      const context = `
        User's resume information:
        - Name: ${resumeData?.personalInfo?.name || "Not provided"}
        - Current/Latest Job: ${resumeData?.experience?.[0]?.title || "Not provided"} at ${
          resumeData?.experience?.[0]?.company || "Not provided"
        }
        - Skills: ${resumeData?.skills?.join(", ") || "Not provided"}
        - Experience Level: ${resumeData?.experience?.length || 0} positions
        
        Please provide helpful, encouraging advice with emojis and be specific to their situation.
        Format your response with clear sections and use emojis to make it engaging.
        Be supportive and motivational while providing actionable advice.
      `

      const response = await geminiAI.getChatResponse(userMessage, context)
      const { enhancedResponse, image } = enhanceResponse(response, userMessage)

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: enhancedResponse,
          image: image,
        },
      ])
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "😅 Oops! I encountered an error. Please try again in a moment. I'm here to help! 🤖✨",
          image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=250&h=150&fit=crop&crop=center",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-cyan-500/30 rounded-lg neon-border-cyan backdrop-blur-lg">
      <div className="p-4 border-b border-cyan-500/30 flex justify-between items-center bg-slate-800/50">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-cyan-400 mr-2 neon-text-cyan animate-neon-pulse" />
          <h3 className="font-semibold text-white neon-text-cyan">Sarthi AI Assistant</h3>
        </div>
        <div className="text-xs text-gray-400">🤖 AI-Powered Career Helper</div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-cyan-500/20 text-white neon-border-cyan"
                    : "bg-slate-800/50 text-gray-200 neon-border-purple"
                }`}
              >
                <div className="flex items-start">
                  {message.role === "assistant" && (
                    <Bot className="h-5 w-5 mr-2 mt-1 flex-shrink-0 text-purple-400 neon-text-purple" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
                    {message.image && (
                      <div className="mt-3">
                        <img
                          src={message.image || "/placeholder.svg"}
                          alt="AI Response Visual"
                          className="rounded-lg max-w-full h-auto border border-purple-500/30 shadow-lg"
                        />
                      </div>
                    )}
                  </div>
                  {message.role === "user" && <User className="h-5 w-5 ml-2 mt-1 flex-shrink-0 text-cyan-400" />}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-800/50 text-gray-200 neon-border-purple rounded-lg p-4 max-w-[80%]">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 mr-2 text-purple-400 neon-text-purple" />
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm">Sarthi AI is thinking... 🤔✨</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-cyan-500/30 bg-slate-800/50">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Sarthi AI for resume advice... 💬"
            disabled={isLoading}
            className="flex-1 bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-400 focus-visible:ring-cyan-400 focus:border-cyan-400"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="neon-button-cyan text-black hover:scale-105 transition-transform"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
        <div className="text-xs text-gray-400 mt-2 text-center">
          💡 Try asking: "How can I improve my resume?" or "What skills should I add?" 🚀
        </div>
      </div>
    </div>
  )
}
