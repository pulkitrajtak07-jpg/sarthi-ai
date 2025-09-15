"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleLogin = async () => {
    setLoading(true)
    setMessage("")

    try {
      console.log("Testing direct Supabase login...")

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setMessage(`Error: ${error.message}`)
        console.error("Login error:", error)
      } else {
        setMessage(`Success! User: ${data.user?.email}`)
        console.log("Login successful:", data)

        // Direct redirect
        setTimeout(() => {
          window.location.href = "/dashboard"
        }, 1000)
      }
    } catch (error) {
      console.error("Unexpected error:", error)
      setMessage(`Unexpected error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={loading} className="w-full">
            {loading ? "Testing..." : "Test Login"}
          </Button>
          {message && (
            <div
              className={`p-2 rounded ${message.includes("Success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {message}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
