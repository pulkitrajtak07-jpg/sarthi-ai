"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { createClientBrowser } from "@/lib/supabase"
import { Camera, Plus, X, Save, User, Briefcase, Globe, Github, Linkedin } from "lucide-react"

interface Profile {
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
}

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")
  const [newSkill, setNewSkill] = useState("")

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
          email: "preview@example.com",
          full_name: "Preview User",
          avatar_url: null,
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          job_title: "Software Developer",
          company: "Tech Corp",
          bio: "Passionate software developer with 5 years of experience in full-stack development.",
          linkedin_url: "https://linkedin.com/in/previewuser",
          github_url: "https://github.com/previewuser",
          portfolio_url: "https://previewuser.dev",
          years_experience: 5,
          skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
        })
        setProfileLoading(false)
        return
      }

      const supabase = createClientBrowser()
      const { data, error } = await supabase.from("profiles").select("*").eq("id", user?.id).single()

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error)
      } else if (data) {
        setProfile(data)
      } else {
        // Create initial profile
        const newProfile: Partial<Profile> = {
          id: user?.id,
          email: user?.email,
          full_name: user?.user_metadata?.full_name || "",
          skills: [],
        }
        setProfile(newProfile as Profile)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setProfileLoading(false)
    }
  }

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("File size must be less than 5MB")
      return
    }

    setUploading(true)
    setMessage("")

    try {
      // Mock upload for preview environment
      if (typeof window !== "undefined" && window.location.hostname.includes("v0.dev")) {
        const mockUrl = URL.createObjectURL(file)
        setProfile((prev) => (prev ? { ...prev, avatar_url: mockUrl } : null))
        setMessage("Avatar uploaded successfully!")
        setUploading(false)
        return
      }

      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-blob", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await response.json()
      setProfile((prev) => (prev ? { ...prev, avatar_url: url } : null))
      setMessage("Avatar uploaded successfully!")
    } catch (error) {
      console.error("Error uploading avatar:", error)
      setMessage("Failed to upload avatar")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!profile || !user) return

    setSaving(true)
    setMessage("")

    try {
      // Mock save for preview environment
      if (typeof window !== "undefined" && window.location.hostname.includes("v0.dev")) {
        setMessage("Profile updated successfully!")
        setSaving(false)
        return
      }

      const supabase = createClientBrowser()
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: profile.email,
        full_name: profile.full_name,
        avatar_url: profile.avatar_url,
        phone: profile.phone,
        location: profile.location,
        job_title: profile.job_title,
        company: profile.company,
        bio: profile.bio,
        linkedin_url: profile.linkedin_url,
        github_url: profile.github_url,
        portfolio_url: profile.portfolio_url,
        years_experience: profile.years_experience,
        skills: profile.skills,
        updated_at: new Date().toISOString(),
      })

      if (error) {
        throw error
      }

      setMessage("Profile updated successfully!")
    } catch (error) {
      console.error("Error saving profile:", error)
      setMessage("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && profile) {
      const updatedSkills = [...(profile.skills || []), newSkill.trim()]
      setProfile({ ...profile, skills: updatedSkills })
      setNewSkill("")
    }
  }

  const removeSkill = (index: number) => {
    if (profile) {
      const updatedSkills = profile.skills?.filter((_, i) => i !== index) || []
      setProfile({ ...profile, skills: updatedSkills })
    }
  }

  if (loading || profileLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-gray-300 mt-2">Manage your personal information and preferences.</p>
        </div>

        {message && (
          <Alert
            className={`mb-6 ${message.includes("success") ? "bg-green-900/50 border-green-700 text-green-200" : "bg-red-900/50 border-red-700 text-red-200"}`}
          >
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avatar Section */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Profile Picture</CardTitle>
              <CardDescription className="text-gray-300">Upload a professional photo</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative inline-block">
                <Avatar className="h-32 w-32 mx-auto">
                  <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name || "User"} />
                  <AvatarFallback className="bg-gray-700 text-white text-2xl">
                    {profile.full_name?.[0] || user.email?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full cursor-pointer transition-colors"
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </div>
              {uploading && <p className="text-gray-300 text-sm mt-2">Uploading...</p>}
            </CardContent>
          </Card>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name" className="text-gray-200">
                      Full Name
                    </Label>
                    <Input
                      id="full_name"
                      value={profile.full_name || ""}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email || ""}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-200">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone || ""}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-gray-200">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={profile.location || ""}
                      onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="City, State/Country"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Professional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="job_title" className="text-gray-200">
                      Job Title
                    </Label>
                    <Input
                      id="job_title"
                      value={profile.job_title || ""}
                      onChange={(e) => setProfile({ ...profile, job_title: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-gray-200">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={profile.company || ""}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Current company"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="years_experience" className="text-gray-200">
                    Years of Experience
                  </Label>
                  <Input
                    id="years_experience"
                    type="number"
                    value={profile.years_experience || ""}
                    onChange={(e) =>
                      setProfile({ ...profile, years_experience: Number.parseInt(e.target.value) || null })
                    }
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Years of experience"
                  />
                </div>
                <div>
                  <Label htmlFor="bio" className="text-gray-200">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={profile.bio || ""}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
                <CardDescription className="text-gray-300">Add your technical and professional skills</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.skills?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-200 hover:bg-gray-600">
                      {skill}
                      <button onClick={() => removeSkill(index)} className="ml-2 text-gray-400 hover:text-gray-200">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="linkedin_url" className="text-gray-200 flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn URL
                  </Label>
                  <Input
                    id="linkedin_url"
                    value={profile.linkedin_url || ""}
                    onChange={(e) => setProfile({ ...profile, linkedin_url: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <Label htmlFor="github_url" className="text-gray-200 flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub URL
                  </Label>
                  <Input
                    id="github_url"
                    value={profile.github_url || ""}
                    onChange={(e) => setProfile({ ...profile, github_url: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div>
                  <Label htmlFor="portfolio_url" className="text-gray-200 flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Portfolio URL
                  </Label>
                  <Input
                    id="portfolio_url"
                    value={profile.portfolio_url || ""}
                    onChange={(e) => setProfile({ ...profile, portfolio_url: e.target.value })}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button onClick={handleSave} disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Save className="mr-2 h-4 w-4" />
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
