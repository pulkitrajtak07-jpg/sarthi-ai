"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Send, X, MessageSquare, Loader2, Sparkles } from "lucide-react"
import { geminiAI } from "@/lib/gemini-ai-service"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  sender: "user" | "bot"
  text: string
  timestamp: number
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory")
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages))
      } catch (e) {
        console.error("Error parsing chat history:", e)
        addBotMessage("Hello! I'm Sarthi AI, your personal career assistant. How can I help you today?")
      }
    } else {
      // Add welcome message if no chat history
      addBotMessage(
        "Hello! I'm Sarthi AI, your personal career assistant powered by advanced AI. How can I help you today?",
      )
    }
  }, [])

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages))
    }
  }, [messages])

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { sender: "bot", text, timestamp: Date.now() }])
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    const newMessages = [...messages, { sender: "user", text: userMessage, timestamp: Date.now() }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      // Use Gemini AI for intelligent responses
      const context = messages
        .slice(-5)
        .map((m) => `${m.sender}: ${m.text}`)
        .join("\n")
      const aiResponse = await geminiAI.getChatResponse(userMessage, context)
      setMessages([...newMessages, { sender: "bot", text: aiResponse, timestamp: Date.now() }])
    } catch (error) {
      console.error("AI chat error:", error)
      const fallbackResponse =
        "I'm sorry, I'm having trouble processing your request right now. Please try again later, or feel free to ask me about resume writing, job searching, or career development."
      setMessages([...newMessages, { sender: "bot", text: fallbackResponse, timestamp: Date.now() }])
    }

    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "Chat history cleared. How can I help you today?",
        timestamp: Date.now(),
      },
    ])
    localStorage.removeItem("chatHistory")
  }

  const suggestedQuestions = [
    "How can I improve my resume?",
    "What skills should I highlight?",
    "Tips for job interviews?",
    "How to write a cover letter?",
    "How to explain employment gaps?",
  ]

  return (
    <>
      {/* Chat button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 gradient-button p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50 flex items-center justify-center floating-3d"
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 card-3d rounded-xl w-80 sm:w-96 max-h-[70vh] flex flex-col z-50"
          >
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-t-xl">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 text-cyan-400 mr-2 floating-3d" />
                <h3 className="font-medium neon-text-cyan">Sarthi AI Assistant</h3>
                <span className="ml-2 text-xs bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-2 py-1 rounded-full">
                  AI
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={clearChat}
                  className="text-xs text-gray-400 hover:text-cyan-400 transition-colors px-2 py-1 rounded hover:bg-cyan-500/10"
                >
                  Clear
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors p-1 rounded hover:bg-cyan-500/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-900/50">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "gradient-button text-white rounded-br-none"
                        : "bg-slate-800/80 text-gray-100 rounded-bl-none border border-cyan-500/30 holographic"
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-slate-800/80 text-gray-100 px-3 py-2 rounded-lg rounded-bl-none flex items-center border border-cyan-500/30">
                    <Loader2 className="h-4 w-4 animate-spin mr-2 text-cyan-400" />
                    <span className="neon-text-cyan">Sarthi AI is thinking...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions */}
            {messages.length < 3 && (
              <div className="px-4 py-2 border-t border-cyan-500/30 bg-slate-900/30">
                <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-1">
                  {suggestedQuestions.slice(0, 3).map((question, i) => (
                    <button
                      key={i}
                      onClick={() => setInput(question)}
                      className="text-xs bg-cyan-500/10 text-cyan-300 px-2 py-1 rounded-full hover:bg-cyan-500/20 transition-colors border border-cyan-500/30 holographic"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat input */}
            <div className="p-4 border-t border-cyan-500/30 bg-slate-900/50 rounded-b-xl">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Sarthi AI anything..."
                  className="flex-1 px-3 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400 holographic"
                  disabled={loading}
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="gradient-button p-2 rounded-lg disabled:opacity-50 transition-colors"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
