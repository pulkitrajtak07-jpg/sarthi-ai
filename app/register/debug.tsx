"use client"

import { useState } from "react"
import { createClientBrowser } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupabaseDebugPage() {
  const [status, setStatus] = useState<string>("Not tested")
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>({})

  const testSupabaseConnection = async () => {
    setStatus("Testing...")

    try {
      // Check environment variables
      const envVarsToCheck = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

      const vars: Record<string, string | undefined> = {}
      envVarsToCheck.forEach((key) => {
        vars[key] = process.env[key] || undefined
      })
      setEnvVars(vars)

      // Test Supabase connection
      const supabase = createClientBrowser()

      // Try a simple query to test connection
      const { data, error } = await supabase.from("user_profiles").select("id").limit(1)

      if (error) {
        setStatus(`Connection error: ${error.message}`)
        return
      }

      setStatus(`Connection successful! Response: ${JSON.stringify(data)}`)
    } catch (error) {
      setStatus(`Test failed with error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Supabase Connection Debug</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button onClick={testSupabaseConnection}>Test Supabase Connection</Button>

            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <h3 className="font-medium mb-2">Status:</h3>
              <pre className="whitespace-pre-wrap">{status}</pre>
            </div>

            <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <h3 className="font-medium mb-2">Environment Variables:</h3>
              <pre className="whitespace-pre-wrap">
                {Object.entries(envVars).map(
                  ([key, value]) =>
                    `${key}: ${value ? (value.length > 10 ? value.substring(0, 10) + "..." : value) : "undefined"}\n`,
                )}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
