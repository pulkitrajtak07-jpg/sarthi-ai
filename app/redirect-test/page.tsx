"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RedirectTestPage() {
  const [method, setMethod] = useState("")
  const router = useRouter()

  const testRedirects = [
    {
      name: "router.push",
      action: () => {
        setMethod("router.push")
        router.push("/dashboard")
      },
    },
    {
      name: "router.replace",
      action: () => {
        setMethod("router.replace")
        router.replace("/dashboard")
      },
    },
    {
      name: "window.location.href",
      action: () => {
        setMethod("window.location.href")
        window.location.href = "/dashboard"
      },
    },
    {
      name: "window.location.replace",
      action: () => {
        setMethod("window.location.replace")
        window.location.replace("/dashboard")
      },
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Redirect Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">Test different redirect methods to see which one works:</p>

          {testRedirects.map((test) => (
            <Button key={test.name} onClick={test.action} className="w-full" variant="outline">
              Test {test.name}
            </Button>
          ))}

          {method && <div className="p-2 bg-blue-100 text-blue-800 rounded text-sm">Testing: {method}</div>}
        </CardContent>
      </Card>
    </div>
  )
}
