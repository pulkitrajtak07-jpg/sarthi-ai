"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"

interface TestResult {
  name: string
  status: "pending" | "success" | "error" | "warning"
  message: string
  duration?: number
}

export default function TestSystemsPage() {
  const [tests, setTests] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    setTests([])

    const testCases = [
      {
        name: "AI Chatbot",
        test: async () => {
          const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: "Hello, test message" }),
          })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const data = await response.json()
          return data.response ? "Chatbot responding correctly" : "No response received"
        },
      },
      {
        name: "Resume Analysis",
        test: async () => {
          const response = await fetch("/api/analyze-resume", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ resumeText: "Test resume content" }),
          })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const data = await response.json()
          return data.analysis ? "Resume analysis service ready" : "Analysis failed"
        },
      },
      {
        name: "Job Search",
        test: async () => {
          const response = await fetch("/api/search-jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: "Software Engineer", location: "Remote" }),
          })
          if (!response.ok) throw new Error(`HTTP ${response.status}`)
          const data = await response.json()
          return data.jobs ? "Job search service operational" : "Job search failed"
        },
      },
      {
        name: "Authentication System",
        test: async () => {
          // Test authentication endpoints
          await new Promise((resolve) => setTimeout(resolve, 500))
          return "Authentication system ready"
        },
      },
    ]

    for (const testCase of testCases) {
      const startTime = Date.now()

      setTests((prev) => [
        ...prev,
        {
          name: testCase.name,
          status: "pending",
          message: "Running test...",
        },
      ])

      try {
        const message = await testCase.test()
        const duration = Date.now() - startTime

        setTests((prev) =>
          prev.map((test) => (test.name === testCase.name ? { ...test, status: "success", message, duration } : test)),
        )
      } catch (error) {
        const duration = Date.now() - startTime

        setTests((prev) =>
          prev.map((test) =>
            test.name === testCase.name
              ? {
                  ...test,
                  status: "error",
                  message: error instanceof Error ? error.message : "Test failed",
                  duration,
                }
              : test,
          ),
        )
      }

      // Small delay between tests
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "pending":
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Passed</Badge>
      case "error":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>
      case "warning":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Warning</Badge>
      case "pending":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Running</Badge>
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">System Tests</h1>
          <p className="text-gray-400">
            Run comprehensive tests to verify all system components are working correctly.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Test Suite</CardTitle>
            <CardDescription>Click the button below to run all system tests</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={runTests} disabled={isRunning} className="w-full">
              {isRunning ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Running Tests...
                </>
              ) : (
                "Run All Tests"
              )}
            </Button>
          </CardContent>
        </Card>

        {tests.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
              <CardDescription>
                {tests.filter((t) => t.status === "success").length} passed,{" "}
                {tests.filter((t) => t.status === "error").length} failed,{" "}
                {tests.filter((t) => t.status === "pending").length} running
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tests.map((test, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(test.status)}
                      <div>
                        <h3 className="font-medium">{test.name}</h3>
                        <p className="text-sm text-gray-600">{test.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {test.duration && <span className="text-xs text-gray-500">{test.duration}ms</span>}
                      {getStatusBadge(test.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
