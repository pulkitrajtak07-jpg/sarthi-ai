import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton pattern for client-side usage
let browserClient: ReturnType<typeof createClient> | null = null

export const createClientBrowser = () => {
  if (browserClient) return browserClient

  browserClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
  })

  return browserClient
}

// Create a server-side client (only use in server components)
export const createClientServer = async () => {
  const { cookies } = await import("next/headers")
  const cookieStore = cookies()

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "pkce",
    },
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
    },
  })
}

// Main supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null

export function createSupabaseClient() {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        flowType: "pkce",
      },
    })
  }
  return supabaseInstance
}

// Server-side client for admin operations (only use in API routes)
export const createServerClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

export const supabase = createSupabaseClient()

// Database types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          location: string | null
          job_title: string | null
          company: string | null
          bio: string | null
          linkedin_url: string | null
          github_url: string | null
          portfolio_url: string | null
          years_experience: number | null
          skills: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          location?: string | null
          job_title?: string | null
          company?: string | null
          bio?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          portfolio_url?: string | null
          years_experience?: number | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          location?: string | null
          job_title?: string | null
          company?: string | null
          bio?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          portfolio_url?: string | null
          years_experience?: number | null
          skills?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]

export type { User } from "@supabase/supabase-js"

export default supabase
