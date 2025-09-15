import { NextResponse } from "next/server"
import { createClientServer } from "@/lib/supabase"

export async function GET() {
  try {
    // Check environment variables
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✓ Set" : "✗ Missing",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✓ Set" : "✗ Missing",
      SUPABASE_URL: process.env.SUPABASE_URL ? "✓ Set" : "✗ Missing",
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✓ Set" : "✗ Missing",
    }

    // Test Supabase connection
    let connectionStatus = "Not tested"
    let error = null

    try {
      const supabase = createClientServer()
      const { data, error: supabaseError } = await supabase.from("user_profiles").select("id").limit(1)

      if (supabaseError) {
        connectionStatus = "Error"
        error = supabaseError
      } else {
        connectionStatus = "Success"
      }
    } catch (e) {
      connectionStatus = "Exception"
      error = e instanceof Error ? e.message : String(e)
    }

    return NextResponse.json({
      status: "ok",
      environment: envVars,
      supabase: {
        connection: connectionStatus,
        error,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
