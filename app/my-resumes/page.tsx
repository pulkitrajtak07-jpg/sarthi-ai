"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FileText, Download, Eye, Edit, Trash2, Plus, Calendar, Star } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

interface Resume {
  id: string
  user_id: string
  title: string
  template_name: string
  content: any
  is_favorite: boolean
  created_at: string
  updated_at: string
  download_count: number
  view_count: number
}

const MyResumesPage = () => {
  const { user } = useAuth()
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchResumes()
    }
  }, [user])

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .eq("user_id", user?.id)
        .order("updated_at", { ascending: false })

      if (error) {
        console.error("Error fetching resumes:", error)
        return
      }

      setResumes(data || [])
    } catch (error) {
      console.error("Error fetching resumes:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleFavorite = async (resumeId: string, currentFavorite: boolean) => {
    try {
      const { error } = await supabase.from("resumes").update({ is_favorite: !currentFavorite }).eq("id", resumeId)

      if (error) {
        console.error("Error updating favorite:", error)
        return
      }

      setResumes(
        resumes.map((resume) => (resume.id === resumeId ? { ...resume, is_favorite: !currentFavorite } : resume)),
      )
    } catch (error) {
      console.error("Error updating favorite:", error)
    }
  }

  const handleDeleteResume = async (resumeId: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return

    try {
      const { error } = await supabase.from("resumes").delete().eq("id", resumeId)

      if (error) {
        console.error("Error deleting resume:", error)
        return
      }

      setResumes(resumes.filter((resume) => resume.id !== resumeId))
    } catch (error) {
      console.error("Error deleting resume:", error)
    }
  }

  const getTemplateColor = (templateName: string) => {
    const colors = {
      modern: "bg-cyan-500/20 text-cyan-300",
      creative: "bg-purple-500/20 text-purple-300",
      professional: "bg-blue-500/20 text-blue-300",
      minimalist: "bg-gray-500/20 text-gray-300",
      tech: "bg-green-500/20 text-green-300",
      executive: "bg-red-500/20 text-red-300",
    }
    return colors[templateName as keyof typeof colors] || "bg-gray-500/20 text-gray-300"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your resumes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold neon-text-cyan mb-2">My Resumes</h1>
              <p className="text-gray-400 text-lg">Manage and track your resume collection</p>
            </div>
            <Link href="/resume-builder">
              <Button className="gradient-button flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create New Resume</span>
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Resumes",
              value: resumes.length,
              icon: FileText,
              color: "cyan",
            },
            {
              title: "Favorites",
              value: resumes.filter((r) => r.is_favorite).length,
              icon: Star,
              color: "purple",
            },
            {
              title: "Total Downloads",
              value: resumes.reduce((sum, r) => sum + (r.download_count || 0), 0),
              icon: Download,
              color: "cyan",
            },
            {
              title: "Total Views",
              value: resumes.reduce((sum, r) => sum + (r.view_count || 0), 0),
              icon: Eye,
              color: "purple",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="card-3d">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                      <p
                        className={`text-3xl font-bold ${stat.color === "cyan" ? "neon-text-cyan" : "neon-text-purple"}`}
                      >
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`p-3 rounded-full ${stat.color === "cyan" ? "bg-cyan-500/20" : "bg-purple-500/20"}`}
                    >
                      <stat.icon className={`h-6 w-6 ${stat.color === "cyan" ? "text-cyan-400" : "text-purple-400"}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Resumes Grid */}
        {resumes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <FileText className="w-24 h-24 text-gray-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-white mb-4">No resumes yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Start building your professional resume with our AI-powered tools and beautiful templates.
            </p>
            <Link href="/resume-builder">
              <Button className="gradient-button flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Create Your First Resume</span>
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume, index) => (
              <motion.div
                key={resume.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-3d hover:scale-105 transition-transform duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-2 line-clamp-2">{resume.title}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Badge className={getTemplateColor(resume.template_name)}>{resume.template_name}</Badge>
                          {resume.is_favorite && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{resume.view_count || 0} views</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{resume.download_count || 0} downloads</span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="text-xs text-gray-500">
                      <div className="flex items-center space-x-1 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>Created: {new Date(resume.created_at).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Updated: {new Date(resume.updated_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link href={`/resume-builder/editor?id=${resume.id}`}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleFavorite(resume.id, resume.is_favorite)}
                      >
                        <Star
                          className={`w-4 h-4 ${resume.is_favorite ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                        />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteResume(resume.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyResumesPage
