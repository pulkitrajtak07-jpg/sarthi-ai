"use client"

import type React from "react"
import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import Image from "next/image"
import { Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle, Sparkles, Shield } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setMessage("")

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage("Password reset email sent! Please check your inbox and follow the instructions.")
        setEmailSent(true)
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Password reset error:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleResendEmail = async () => {
    if (!email) return

    setLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage("Password reset email sent again! Please check your inbox.")
      }
    } catch (err: any) {
      setError("Failed to resend email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4 cyber-bg relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-spin-slow"></div>

        {/* Floating particles */}
        <div className="particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center neon-border-cyan floating">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold neon-text-cyan mb-4 animate-neon-pulse">Sarthi AI</h1>
            <p className="text-xl text-gray-300 mb-8">Your AI-Powered Career Assistant</p>
          </div>

          <div className="relative neon-card-purple p-6 rounded-2xl floating-slow">
            <Image
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop&crop=center"
              alt="AI-powered resume analysis and career guidance"
              width={500}
              height={300}
              className="rounded-xl w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-xl" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-gray-300">
              <Shield className="h-5 w-5 text-cyan-400" />
              <span>Secure password reset process</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Email verification for security</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-300">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span>Get back to building your career</span>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-lg neon-border-blue floating relative">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 floating-fast">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent neon-text-blue">
                Reset Password
              </CardTitle>
              <CardDescription className="text-slate-300">
                {emailSent
                  ? "We've sent you a password reset link"
                  : "Enter your email address and we'll send you a link to reset your password"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {error && (
                <Alert className="border-red-500/50 bg-red-500/10 animate-shake">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-300">{error}</AlertDescription>
                </Alert>
              )}

              {message && (
                <Alert className="border-green-500/50 bg-green-500/10 animate-bounce-in">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <AlertDescription className="text-green-300">{message}</AlertDescription>
                </Alert>
              )}

              {!emailSent ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-200">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full neon-button-blue text-white font-medium transition-all duration-300 transform hover:scale-105"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Reset Email...
                      </>
                    ) : (
                      "Send Reset Email"
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-lg neon-border-green">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-300 mb-2">Email Sent Successfully!</h3>
                    <p className="text-slate-300 text-sm mb-4">
                      Check your inbox and click the reset link to continue.
                    </p>
                    <div className="text-xs text-slate-400">
                      The email may take a few minutes to arrive. Don't forget to check your spam folder.
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-slate-400 text-sm">Didn't receive the email?</p>
                    <Button
                      variant="outline"
                      onClick={handleResendEmail}
                      disabled={loading}
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Resending...
                        </>
                      ) : (
                        "Resend Email"
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <div className="text-center pt-4 border-t border-slate-700">
                <Link
                  href="/login"
                  className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors hover:underline"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </div>

              {/* Additional Help */}
              <div className="text-center pt-2">
                <p className="text-xs text-slate-500">
                  Need help? Contact our{" "}
                  <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                    support team
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Mobile Branding */}
          <div className="lg:hidden mt-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center neon-border-cyan">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-bold neon-text-cyan mb-2">Sarthi AI</h2>
            <p className="text-gray-400">Your AI-Powered Career Assistant</p>
          </div>
        </div>
      </div>
    </div>
  )
}
