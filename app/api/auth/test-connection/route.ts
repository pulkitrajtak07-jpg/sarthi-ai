import { NextResponse } from "next/server"
import { createClientServer } from "@/lib/supabase"

export async function GET() {
  try {
    // Check environment variables
    const envCheck = {
      SUPABASE_URL: !!process.env.SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }

    // Test Supabase connection
    let connectionStatus = "unknown"
    let error = null

    try {
      const supabase = createClientServer()
      const { data, error: supabaseError } = await supabase.auth.getSession()

      if (supabaseError) {
        connectionStatus = "error"
        error = supabaseError
      } else {
        connectionStatus = "success"
      }
    } catch (e) {
      connectionStatus = "exception"
      error = e instanceof Error ? e.message : String(e)
    }

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      environmentVariables: envCheck,
      connectionStatus,
      error,
    })
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to test Supabase connection",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
