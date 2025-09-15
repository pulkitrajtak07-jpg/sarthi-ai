"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, Download, Star, Zap, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  ModernTemplatePreview,
  CreativeTemplatePreview,
  ProfessionalTemplatePreview,
  MinimalistTemplatePreview,
  TechTemplatePreview,
  ExecutiveTemplatePreview,
} from "@/components/template-previews"

interface Template {
  id: string
  name: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  features: string[]
  previewComponent: React.ComponentType
  downloadCount: number
  rating: number
  isPopular: boolean
  isPremium: boolean
}

const ResumeTemplatesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const templates: Template[] = [
    {
      id: "modern-template",
      name: "modern",
      title: "Modern Professional",
      description: "Clean, contemporary design perfect for tech and creative industries with a striking sidebar layout",
      category: "professional",
      difficulty: "Beginner",
      features: ["ATS-Friendly", "Clean Layout", "Modern Typography", "Color Customization"],
      previewComponent: ModernTemplatePreview,
      downloadCount: 15420,
      rating: 4.8,
      isPopular: true,
      isPremium: false,
    },
    {
      id: "creative-template",
      name: "creative",
      title: "Creative Designer",
      description: "Bold and artistic design for creative professionals with gradient accents and visual skill bars",
      category: "creative",
      difficulty: "Intermediate",
      features: ["Visual Elements", "Creative Layout", "Portfolio Section", "Color Gradients"],
      previewComponent: CreativeTemplatePreview,
      downloadCount: 12350,
      rating: 4.7,
      isPopular: true,
      isPremium: false,
    },
    {
      id: "professional-template",
      name: "professional",
      title: "Executive Professional",
      description: "Traditional and sophisticated design perfect for corporate environments and business roles",
      category: "professional",
      difficulty: "Beginner",
      features: ["Corporate Style", "Traditional Layout", "Professional Fonts", "Formal Structure"],
      previewComponent: ProfessionalTemplatePreview,
      downloadCount: 18750,
      rating: 4.9,
      isPopular: true,
      isPremium: false,
    },
    {
      id: "minimalist-template",
      name: "minimalist",
      title: "Minimalist Clean",
      description: "Simple and elegant design focusing on content with clean typography and white space",
      category: "minimalist",
      difficulty: "Beginner",
      features: ["Minimal Design", "Clean Typography", "White Space", "Easy to Read"],
      previewComponent: MinimalistTemplatePreview,
      downloadCount: 9840,
      rating: 4.6,
      isPopular: false,
      isPremium: false,
    },
    {
      id: "tech-template",
      name: "tech",
      title: "Tech Developer",
      description: "Dark theme design perfect for developers and tech professionals with terminal-inspired styling",
      category: "tech",
      difficulty: "Intermediate",
      features: ["Dark Theme", "Code-Friendly", "Tech Icons", "Modern Layout"],
      previewComponent: TechTemplatePreview,
      downloadCount: 11200,
      rating: 4.7,
      isPopular: false,
      isPremium: false,
    },
    {
      id: "executive-template",
      name: "executive",
      title: "Executive Leadership",
      description: "Premium design for C-level executives and senior management with sophisticated styling",
      category: "executive",
      difficulty: "Advanced",
      features: ["Premium Design", "Executive Layout", "Leadership Focus", "Sophisticated Style"],
      previewComponent: ExecutiveTemplatePreview,
      downloadCount: 6750,
      rating: 4.9,
      isPopular: false,
      isPremium: true,
    },
  ]

  const categories = [
    { id: "all", name: "All Templates" },
    { id: "professional", name: "Professional" },
    { id: "creative", name: "Creative" },
    { id: "tech", name: "Technology" },
    { id: "minimalist", name: "Minimalist" },
    { id: "executive", name: "Executive" },
  ]

  const difficulties = [
    { id: "all", name: "All Levels" },
    { id: "Beginner", name: "Beginner" },
    { id: "Intermediate", name: "Intermediate" },
    { id: "Advanced", name: "Advanced" },
  ]

  const filteredTemplates = templates.filter((template) => {
    if (selectedCategory !== "all" && template.category !== selectedCategory) return false
    if (selectedDifficulty !== "all" && template.difficulty !== selectedDifficulty) return false
    return true
  })

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: "bg-green-500/20 text-green-300 border-green-500/30",
      Intermediate: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      Advanced: "bg-red-500/20 text-red-300 border-red-500/30",
    }
    return colors[difficulty as keyof typeof colors] || "bg-gray-500/20 text-gray-300 border-gray-500/30"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="text-5xl font-bold neon-text-cyan mb-4">Resume Templates</h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto">
            Choose from our collection of professional, ATS-friendly resume templates designed to help you land your
            dream job
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="card-3d">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className={
                          selectedCategory === category.id
                            ? "gradient-button"
                            : "border-cyan-500/30 text-gray-300 hover:text-white hover:border-cyan-400/50"
                        }
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-semibold mb-3 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Difficulty Level
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((difficulty) => (
                      <Button
                        key={difficulty.id}
                        variant={selectedDifficulty === difficulty.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedDifficulty(difficulty.id)}
                        className={
                          selectedDifficulty === difficulty.id
                            ? "gradient-button"
                            : "border-cyan-500/30 text-gray-300 hover:text-white hover:border-cyan-400/50"
                        }
                      >
                        {difficulty.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTemplates.map((template, index) => {
            const PreviewComponent = template.previewComponent
            return (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-3d hover:scale-105 transition-all duration-300 overflow-hidden group">
                  {/* Template Preview */}
                  <div className="relative bg-gray-100 p-4">
                    <PreviewComponent />

                    {/* Overlay with badges */}
                    <div className="absolute top-6 left-6 flex flex-col space-y-2">
                      {template.isPopular && (
                        <Badge className="bg-cyan-500/90 text-white border-cyan-400 shadow-lg">
                          <Star className="w-3 h-3 mr-1 fill-white" />
                          Popular
                        </Badge>
                      )}
                      {template.isPremium && (
                        <Badge className="bg-purple-500/90 text-white border-purple-400 shadow-lg">
                          <Zap className="w-3 h-3 mr-1 fill-white" />
                          Premium
                        </Badge>
                      )}
                    </div>

                    {/* Quick Preview Button */}
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90 border-gray-300 text-gray-700 hover:bg-white"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-white text-xl mb-2 flex items-center">
                          {template.title}
                          {template.isPopular && <Star className="w-4 h-4 ml-2 text-yellow-400 fill-yellow-400" />}
                        </CardTitle>
                        <CardDescription className="text-gray-400 leading-relaxed">
                          {template.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Stats */}
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Download className="w-4 h-4" />
                        <span>{template.downloadCount.toLocaleString()} downloads</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-400">{template.rating}</span>
                      </div>
                    </div>

                    {/* Category and Difficulty */}
                    <div className="flex items-center space-x-2">
                      <Badge className={getDifficultyColor(template.difficulty)}>{template.difficulty}</Badge>
                      <Badge variant="outline" className="text-xs border-cyan-500/30 text-cyan-300">
                        {template.category}
                      </Badge>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {template.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-400">
                            <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2"></div>
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Button asChild className="gradient-button flex-1 group">
                        <Link href={`/resume-builder?template=${template.name}`} className="flex items-center">
                          Use Template
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Eye className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">No templates found</h3>
            <p className="text-gray-400 mb-8">Try adjusting your filters to see more templates.</p>
            <Button
              onClick={() => {
                setSelectedCategory("all")
                setSelectedDifficulty("all")
              }}
              className="gradient-button"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ResumeTemplatesPage
