import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/context/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { GlobalChatbot } from "@/components/global-chatbot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sarthi AI - AI-Powered Resume Builder",
  description: "Transform your career with AI-powered resume analysis and building",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <AuthProvider>
            <div className="min-h-screen flex flex-col relative bg-slate-900">
              {/* Particle System */}
              <div className="particles">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div
                    key={i}
                    className="particle"
                    style={{
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 15}s`,
                      animationDuration: `${15 + Math.random() * 10}s`,
                    }}
                  />
                ))}
              </div>

              {/* 3D Background Elements */}
              <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl floating-3d" />
                <div
                  className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl floating-3d"
                  style={{ animationDelay: "2s" }}
                />
                <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-500/3 to-purple-500/3 rounded-full blur-3xl rotating-3d" />
              </div>

              <Navbar />
              <main className="flex-1 relative z-10">{children}</main>
              <Footer />
              <GlobalChatbot />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
