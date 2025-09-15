"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientBrowser } from "@/lib/supabase"
import { Eye, EyeOff, Lock, CheckCircle, XCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isValidSession, setIsValidSession] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientBrowser()

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("Session check error:", error)
        setError("Invalid or expired reset link. Please request a new password reset.")
        setCheckingSession(false)
        return
      }

      if (session) {
        setIsValidSession(true)
      } else {
        setError("Invalid or expired reset link. Please request a new password reset.")
      }
    } catch (err) {
      console.error("Session validation error:", err)
      setError("Unable to validate reset session. Please try again.")
    } finally {
      setCheckingSession(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    strength = Object.values(checks).filter(Boolean).length

    return {
      strength,
      checks,
      label: strength < 2 ? "Weak" : strength < 4 ? "Medium" : "Strong",
      color: strength < 2 ? "text-red-500" : strength < 4 ? "text-yellow-500" : "text-green-500",
    }
  }

  const passwordStrength = getPasswordStrength(password)
  const passwordsMatch = password === confirmPassword && password.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!password || !confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (passwordStrength.strength < 3) {
      setError("Please choose a stronger password")
      return
    }

    setLoading(true)
    setError("")
    setMessage("")

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        throw error
      }

      setMessage("🎉 Password updated successfully! Redirecting to login...")

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push("/login?message=Password updated successfully")
      }, 2000)
    } catch (error: any) {
      console.error("Password reset error:", error)
      setError(error.message || "Failed to update password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Validating reset session...</p>
        </div>
      </div>
    )
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white">🔒 Invalid Reset Link</CardTitle>
            <CardDescription className="text-gray-300">
              This password reset link is invalid or has expired.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-red-500 bg-red-500/10">
              <XCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-300">{error}</AlertDescription>
            </Alert>
            <Button
              onClick={() => router.push("/forgot-password")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Request New Reset Link
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/login")}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white">🔐 Reset Your Password</CardTitle>
          <CardDescription className="text-gray-300">Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                  placeholder="Enter new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">Password Strength:</span>
                    <span className={`text-sm font-medium ${passwordStrength.color}`}>{passwordStrength.label}</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.strength < 2
                          ? "bg-red-500"
                          : passwordStrength.strength < 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div
                      className={`flex items-center gap-1 ${passwordStrength.checks.length ? "text-green-400" : "text-gray-500"}`}
                    >
                      {passwordStrength.checks.length ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      8+ characters
                    </div>
                    <div
                      className={`flex items-center gap-1 ${passwordStrength.checks.uppercase ? "text-green-400" : "text-gray-500"}`}
                    >
                      {passwordStrength.checks.uppercase ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      Uppercase
                    </div>
                    <div
                      className={`flex items-center gap-1 ${passwordStrength.checks.lowercase ? "text-green-400" : "text-gray-500"}`}
                    >
                      {passwordStrength.checks.lowercase ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      Lowercase
                    </div>
                    <div
                      className={`flex items-center gap-1 ${passwordStrength.checks.number ? "text-green-400" : "text-gray-500"}`}
                    >
                      {passwordStrength.checks.number ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      Number
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white pr-10"
                  placeholder="Confirm new password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Match Indicator */}
              {confirmPassword && (
                <div
                  className={`flex items-center gap-2 text-sm ${passwordsMatch ? "text-green-400" : "text-red-400"}`}
                >
                  {passwordsMatch ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <Alert className="border-red-500 bg-red-500/10">
                <XCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-300">{error}</AlertDescription>
              </Alert>
            )}

            {/* Success Message */}
            {message && (
              <Alert className="border-green-500 bg-green-500/10">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-300">{message}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !passwordsMatch || passwordStrength.strength < 3}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Updating Password...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Update Password
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Button variant="link" onClick={() => router.push("/login")} className="text-blue-400 hover:text-blue-300">
              ← Back to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
