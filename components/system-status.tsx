"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle, Activity } from "lucide-react"

interface SystemStatus {
  chatbot: "online" | "degraded" | "offline"
  resumeAnalysis: "online" | "degraded" | "offline"
  jobSearch: "online" | "degraded" | "offline"
}

export function SystemStatus() {
  const [status, setStatus] = useState<SystemStatus>({
    chatbot: "online",
    resumeAnalysis: "online",
    jobSearch: "online",
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    checkSystemStatus()
    const interval = setInterval(checkSystemStatus, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const checkSystemStatus = async () => {
    try {
      // Test chatbot
      const chatResponse = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "test" }),
      })

      setStatus((prev) => ({
        ...prev,
        chatbot: chatResponse.ok ? "online" : "degraded",
      }))
    } catch {
      setStatus((prev) => ({ ...prev, chatbot: "degraded" }))
    }
  }

  const getStatusIcon = (serviceStatus: string) => {
    switch (serviceStatus) {
      case "online":
        return <CheckCircle className="w-3 h-3 text-green-500" />
      case "degraded":
        return <AlertCircle className="w-3 h-3 text-yellow-500" />
      case "offline":
        return <XCircle className="w-3 h-3 text-red-500" />
      default:
        return <AlertCircle className="w-3 h-3 text-gray-500" />
    }
  }

  const getStatusColor = (serviceStatus: string) => {
    switch (serviceStatus) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      case "degraded":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
    }
  }

  const overallStatus = Object.values(status).every((s) => s === "online")
    ? "online"
    : Object.values(status).some((s) => s === "offline")
      ? "offline"
      : "degraded"

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {/* Status Indicator */}
        <div
          className={`w-3 h-3 rounded-full cursor-pointer ${
            overallStatus === "online" ? "bg-green-500" : overallStatus === "degraded" ? "bg-yellow-500" : "bg-red-500"
          } animate-pulse`}
        />

        {/* Detailed Status Panel */}
        {isVisible && (
          <div className="absolute bottom-6 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3 min-w-[200px]">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">System Status</span>
            </div>
            <div className="space-y-1">
              <Badge
                variant="outline"
                className={`flex items-center gap-1 text-xs w-full justify-start ${getStatusColor(status.chatbot)}`}
              >
                {getStatusIcon(status.chatbot)}
                AI Chat: {status.chatbot}
              </Badge>
              <Badge
                variant="outline"
                className={`flex items-center gap-1 text-xs w-full justify-start ${getStatusColor(status.resumeAnalysis)}`}
              >
                {getStatusIcon(status.resumeAnalysis)}
                Resume Analysis: {status.resumeAnalysis}
              </Badge>
              <Badge
                variant="outline"
                className={`flex items-center gap-1 text-xs w-full justify-start ${getStatusColor(status.jobSearch)}`}
              >
                {getStatusIcon(status.jobSearch)}
                Job Search: {status.jobSearch}
              </Badge>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
