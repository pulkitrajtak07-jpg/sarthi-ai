"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClientBrowser } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, fullName: string) => Promise<{ error?: string }>
  signInWithGoogle: () => Promise<{ error?: string }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientBrowser()

  useEffect(() => {
    // Check if we're in preview environment
    if (typeof window !== "undefined" && window.location.hostname.includes("v0.dev")) {
      // Mock user for preview
      setUser({
        id: "preview-user-123",
        email: "preview@example.com",
        user_metadata: { full_name: "Preview User" },
        app_metadata: {},
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as User)
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signIn = async (email: string, password: string) => {
    try {
      // Mock response for preview
      if (typeof window !== "undefined" && window.location.hostname.includes("v0.dev")) {
        setUser({
          id: "preview-user-123",
          email: email,
          user_metadata: { full_name: "Preview User" },
          app_metadata: {},
          aud: "authenticated",
          created_at: new Date().toISOString(),
        } as User)
        return {}
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch (error) {
      return { error: "An unexpected error occurred" }
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Mock response for preview
      if (typeof window !== "undefined" && window.location.hostname.includes("v0.dev")) {
        setUser({
          id: "preview-user-123",
          email: email,
          user_metadata: { full_name: fullName },
          app_metadata: {},
          aud: "authenticated",
          created_at: new Date().toISOString(),
        } as User)
        return {}
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch (error) {
      return { error: "An unexpected error occurred" }
    }
  }

  const signInWithGoogle = async () => {
    try {
      // Mock response for preview
      if (typeof window !== "undefined" && window.location.hostname.includes("v0.dev")) {
        setUser({
          id: "preview-user-123",
          email: "google@example.com",
          user_metadata: { full_name: "Google User" },
          app_metadata: {},
          aud: "authenticated",
          created_at: new Date().toISOString(),
        } as User)
        return {}
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://yiuhrbtifnpgcjuxldze.supabase.co/auth/v1/callback",
        },
      })

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch (error) {
      return { error: "An unexpected error occurred" }
    }
  }

  const signOut = async () => {
    // Mock response for preview
    if (typeof window !== "undefined" && window.location.hostname.includes("v0.dev")) {
      setUser(null)
      return
    }

    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    try {
      // Mock response for preview
      if (typeof window !== "undefined" && window.location.hostname.includes("v0.dev")) {
        return {}
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        return { error: error.message }
      }

      return {}
    } catch (error) {
      return { error: "An unexpected error occurred" }
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
