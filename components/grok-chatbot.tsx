"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sparkles, Send, X, Loader2, Minimize2 } from "lucide-react"
import { generateText } from "ai"
import { xai } from "@ai-sdk/xai"
import { openai } from "@ai-sdk/openai"

// Check if we're in a preview environment
const isPreviewEnvironment = () => {
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development" ||
    (typeof window !== "undefined" && window.location.hostname === "localhost")
  )
}

// Mock responses for preview environments
const MOCK_RESPONSES = {
  hello: "Hello! I'm Sarthi AI, your resume and job search assistant. How can I help you today?",
  help: "I can help you with:\n- Creating a professional resume\n- Analyzing your existing resume\n- Finding job opportunities\n- Preparing for interviews\n- Optimizing your resume for ATS systems\n\nJust let me know what you need!",
  resume:
    "I can help you create a professional resume! Here are some tips:\n1. Use a clean, professional template\n2. Highlight your achievements with quantifiable results\n3. Tailor your resume to each job application\n4. Include relevant keywords from the job description\n5. Keep it concise - 1-2 pages is ideal\n\nWould you like me to help you build a resume now?",
  job: "Looking for job opportunities? Here are some strategies:\n1. Use our job search feature to find relevant openings\n2. Set up job alerts on platforms like LinkedIn and Indeed\n3. Tailor your resume for each application\n4. Network with professionals in your field\n5. Prepare for interviews by researching companies\n\nI can help you search for jobs or prepare your application materials.",
  interview:
    "Preparing for interviews? Here are some tips:\n1. Research the company thoroughly\n2. Practice common interview questions\n3. Prepare examples of your achievements\n4. Have questions ready to ask the interviewer\n5. Follow up with a thank-you note\n\nWould you like specific advice for a particular type of interview?",
  default:
    "I'm here to help with your resume and job search needs. You can ask me about creating resumes, finding jobs, preparing for interviews, or optimizing your application materials.",
}

export default function GrokChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Sarthi AI, your resume and job search assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Check if we're in a preview environment
      if (isPreviewEnvironment()) {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate delay

        // Generate a mock response
        let mockResponse = MOCK_RESPONSES.default
        const inputLower = input.toLowerCase()

        if (inputLower.includes("hello") || inputLower.includes("hi")) {
          mockResponse = MOCK_RESPONSES.hello
        } else if (inputLower.includes("help")) {
          mockResponse = MOCK_RESPONSES.help
        } else if (inputLower.includes("resume")) {
          mockResponse = MOCK_RESPONSES.resume
        } else if (inputLower.includes("job") || inputLower.includes("work") || inputLower.includes("career")) {
          mockResponse = MOCK_RESPONSES.job
        } else if (inputLower.includes("interview")) {
          mockResponse = MOCK_RESPONSES.interview
        }

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: mockResponse,
          },
        ])
      } else {
        // Try to use Grok XAI first
        try {
          const prompt = `You are Sarthi AI, a helpful assistant specializing in resume building, job searching, and career advice. 
          Respond to the following message from a user: "${input}"
          Keep your response helpful, professional, and focused on resume and job search topics.`

          const { text } = await generateText({
            model: xai("grok-1"),
            prompt: prompt,
          })

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: text,
            },
          ])
        } catch (xaiError) {
          console.warn("Error with Grok XAI, falling back to OpenAI:", xaiError)

          // Fall back to OpenAI if Grok fails
          const prompt = `You are Sarthi AI, a helpful assistant specializing in resume building, job searching, and career advice. 
          Respond to the following message from a user: "${input}"
          Keep your response helpful, professional, and focused on resume and job search topics.`

          const { text } = await generateText({
            model: openai("gpt-4o"),
            prompt: prompt,
          })

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: text,
            },
          ])
        }
      }
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error. Please try again later.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 bg-emerald-600 hover:bg-emerald-700 shadow-lg flex items-center justify-center"
      >
        <Sparkles className="h-6 w-6" />
      </Button>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 flex items-center gap-2">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg px-4 py-2 flex items-center"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          <span>Sarthi AI Assistant</span>
        </Button>
      </div>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 md:w-96 h-[500px] shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col z-50">
      <CardHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Sparkles className="h-5 w-5 text-emerald-600 mr-2" />
          Sarthi AI Assistant
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => setIsMinimized(true)} className="h-8 w-8">
            <Minimize2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === "user" ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              {message.role === "assistant" && (
                <div className="flex items-center mb-1">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/images/ai-technology.png" alt="Sarthi AI" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                  <span className="text-xs font-semibold">Sarthi AI</span>
                </div>
              )}
              <div className="whitespace-pre-line">{message.content}</div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg p-3 bg-gray-100 dark:bg-gray-800">
              <div className="flex items-center mb-1">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/images/ai-technology.png" alt="Sarthi AI" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <span className="text-xs font-semibold">Sarthi AI</span>
              </div>
              <div className="flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                <span>Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder="Ask about resumes, jobs, or career advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
