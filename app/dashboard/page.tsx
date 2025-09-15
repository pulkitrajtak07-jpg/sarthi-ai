"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { createClientBrowser } from "@/lib/supabase"
import { FileText, Upload, Briefcase, BarChart3, Settings, Eye, Download } from "lucide-react"

interface Profile {
  id: string
  full_name: string | null
  email: string | null
  avatar_url: string | null
  job_title: string | null
  company: string | null
  location: string | null
  skills: string[] | null
  created_at: string
}

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      // Mock data for preview environment
      if (typeof window !== "undefined" && window.location.hostname.includes("v0.dev")) {
        setProfile({
          id: "preview-user-123",
          full_name: "Preview User",
          email: "preview@example.com",
          avatar_url: null,
          job_title: "Software Developer",
          company: "Tech Corp",
          location: "San Francisco, CA",
          skills: ["React", "TypeScript", "Node.js"],
          created_at: new Date().toISOString(),
        })
        setProfileLoading(false)
        return
      }

      const supabase = createClientBrowser()
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user?.id).single()

      if (error) {
        console.error("Error fetching profile:", error)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setProfileLoading(false)
    }
  }

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const quickActions = [
    {
      title: "Upload Resume",
      description: "Upload your resume for AI analysis",
      icon: Upload,
      href: "/upload",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Build Resume",
      description: "Create a new resume from scratch",
      icon: FileText,
      href: "/resume-builder",
      color: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Browse Templates",
      description: "Choose from professional templates",
      icon: Eye,
      href: "/resume-templates",
      color: "bg-purple-600 hover:bg-purple-700",
    },
    {
      title: "Find Jobs",
      description: "Search for relevant job opportunities",
      icon: Briefcase,
      href: "/jobs",
      color: "bg-orange-600 hover:bg-orange-700",
    },
  ]

  const recentActivity = [
    {
      action: "Resume uploaded",
      description: "Software_Engineer_Resume.pdf",
      time: "2 hours ago",
      icon: Upload,
    },
    {
      action: "Template downloaded",
      description: "Modern Professional Template",
      time: "1 day ago",
      icon: Download,
    },
    {
      action: "Job application",
      description: "Applied to Frontend Developer at TechCorp",
      time: "3 days ago",
      icon: Briefcase,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Welcome back, {profile?.full_name || user.email?.split("@")[0] || "User"}!
              </h1>
              <p className="text-gray-300 mt-2">Here's what's happening with your career journey today.</p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/profile">
                <Settings className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={profile?.avatar_url || user.user_metadata?.avatar_url}
                  alt={profile?.full_name || "User"}
                />
                <AvatarFallback className="bg-gray-700 text-white text-lg">
                  {profile?.full_name?.[0] || user.email?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white">{profile?.full_name || "Complete your profile"}</h3>
                <p className="text-gray-300">
                  {profile?.job_title && profile?.company
                    ? `${profile.job_title} at ${profile.company}`
                    : "Add your job title and company"}
                </p>
                <p className="text-gray-400 text-sm">{profile?.location || "Add your location"}</p>
                {profile?.skills && profile.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {profile.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-200">
                        {skill}
                      </Badge>
                    ))}
                    {profile.skills.length > 3 && (
                      <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                        +{profile.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Member since</p>
                <p className="text-sm text-gray-300">
                  {new Date(profile?.created_at || user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Card key={index} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{action.title}</h3>
                        <p className="text-sm text-gray-300">{action.description}</p>
                      </div>
                    </div>
                    <Button asChild className="w-full mt-4 bg-gray-700 hover:bg-gray-600 text-white">
                      <Link href={action.href}>Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Stats and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-4">Your Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <FileText className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">3</h3>
                  <p className="text-gray-300">Resumes Created</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">85%</h3>
                  <p className="text-gray-300">Match Score</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6 text-center">
                  <Briefcase className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">12</h3>
                  <p className="text-gray-300">Jobs Applied</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 bg-gray-700 rounded-lg">
                          <Icon className="h-4 w-4 text-gray-300" />
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium">{activity.action}</p>
                          <p className="text-gray-300 text-sm">{activity.description}</p>
                          <p className="text-gray-400 text-xs">{activity.time}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
