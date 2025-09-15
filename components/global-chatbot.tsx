"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Loader2, Sparkles, Bot, User, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/context/auth-context"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Particle effect for the chat button
const ChatParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-1 h-1 bg-cyan-400 rounded-full"
    initial={{
      scale: 0,
      x: 0,
      y: 0,
      opacity: 0,
    }}
    animate={{
      scale: [0, 1, 0],
      x: Math.random() * 40 - 20,
      y: Math.random() * 40 - 20,
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: 2,
      delay: delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeOut",
    }}
  />
)

// Typing indicator with animated dots
const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="w-2 h-2 bg-cyan-400 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 1,
          delay: i * 0.2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
)

export function GlobalChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "👋 Hi! I'm Sarthi AI, your intelligent career assistant. I can help you with resume optimization, job search strategies, interview preparation, and career development. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [particles, setParticles] = useState([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Generate particles for the chat button
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Create context from user info if available
      const context = user ? `User is logged in as ${user.email}. ` : "User is not logged in. "

      // Get response from chat API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          userId: user?.id || "anonymous",
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "I'm sorry, I couldn't process your request right now.",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error getting AI response:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again later or contact support if the issue persists.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = [
    "Improve my resume",
    "Job interview tips",
    "LinkedIn optimization",
    "Cover letter help",
    "Salary negotiation",
    "Career change advice",
  ]

  return (
    <>
      {/* Floating Chat Button with Particles */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center group overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 0 20px rgba(0, 255, 255, 0.3)",
              "0 0 40px rgba(139, 92, 246, 0.4)",
              "0 0 20px rgba(0, 255, 255, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {/* Particle Effects */}
          {particles.map((particle) => (
            <ChatParticle key={particle.id} delay={particle.delay} />
          ))}

          {/* Pulse Animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 0.3, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />

          {/* Rotating Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />

          {/* Icon */}
          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ rotate: 90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Sparkles className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notification Badge */}
          {!isOpen && messages.length > 1 && (
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <motion.span
                className="text-xs text-white font-bold"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                !
              </motion.span>
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.3, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed ${
              isMinimized ? "bottom-24 right-6 w-80 h-16" : "bottom-24 right-6 w-96 h-[600px]"
            } bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/30 z-50 flex flex-col overflow-hidden`}
            style={{
              boxShadow: "0 0 50px rgba(0, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            {/* Header */}
            <motion.div
              className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-cyan-500/30"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
                <div>
                  <motion.h3
                    className="font-semibold text-white"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Sarthi AI
                  </motion.h3>
                  <motion.p
                    className="text-xs text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Your Career Companion
                  </motion.p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <span className="text-xs text-gray-300">Online</span>
                </motion.div>
                <motion.button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors p-1 rounded hover:bg-cyan-500/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </motion.button>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors p-1 rounded hover:bg-cyan-500/10"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.8 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} items-start space-x-2`}
                        >
                          {message.role === "assistant" && (
                            <motion.div
                              className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0"
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Bot className="h-4 w-4 text-white" />
                            </motion.div>
                          )}
                          <motion.div
                            className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                              message.role === "user"
                                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white ml-auto"
                                : "bg-slate-800/80 text-gray-100 border border-cyan-500/20"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
                            <motion.div
                              className="text-xs opacity-60 mt-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.6 }}
                              transition={{ delay: 0.5 }}
                            >
                              {new Date(message.timestamp).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </motion.div>
                          </motion.div>
                          {message.role === "user" && (
                            <motion.div
                              className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0"
                              whileHover={{ scale: 1.1 }}
                            >
                              <User className="h-4 w-4 text-white" />
                            </motion.div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start items-start space-x-2"
                      >
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Bot className="h-4 w-4 text-white" />
                        </motion.div>
                        <div className="bg-slate-800/80 text-gray-100 px-4 py-3 rounded-2xl flex items-center border border-cyan-500/20">
                          <TypingIndicator />
                          <span className="text-sm ml-3">Thinking...</span>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Quick Actions */}
                {messages.length <= 2 && (
                  <motion.div
                    className="px-4 py-3 border-t border-cyan-500/30 bg-slate-900/20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.slice(0, 4).map((action, i) => (
                        <motion.button
                          key={i}
                          onClick={() => setInput(action)}
                          className="text-xs bg-cyan-500/10 text-cyan-300 px-3 py-2 rounded-lg hover:bg-cyan-500/20 transition-colors border border-cyan-500/20 text-left"
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + i * 0.1 }}
                        >
                          {action}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Input Area */}
                <motion.div
                  className="p-4 border-t border-cyan-500/30 bg-slate-900/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
                    <div className="flex-1">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about your career..."
                        className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-white placeholder-gray-400 resize-none"
                        disabled={isLoading}
                        maxLength={500}
                      />
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="submit"
                        size="icon"
                        disabled={isLoading || !input.trim()}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 border-0 rounded-xl flex-shrink-0"
                      >
                        {isLoading ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Loader2 className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <motion.div whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                            <Send className="w-4 h-4" />
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                  <motion.div
                    className="flex justify-between items-center mt-2 text-xs text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <span>Press Enter to send</span>
                    <span className={input.length > 400 ? "text-red-400" : ""}>{input.length}/500</span>
                  </motion.div>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
