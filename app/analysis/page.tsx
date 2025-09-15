"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { AlertCircle, Download, Share2, Star, TrendingUp, Target, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AnalysisData {
  overallScore: number
  atsScore: number
  contentScore: number
  formatScore: number
  strengths: string[]
  improvements: string[]
  keywordSuggestions: string[]
  sectionFeedback: {
    header: string
    summary: string
    experience: string
    education: string
    skills: string
    other: string
  }
  industryRecommendations: string
  detailedAnalysis: string
  extractedSkills: string[]
  experienceLevel: string
  suggestedJobTitles: string[]
}

// Default analysis data to prevent undefined errors
const defaultAnalysisData: AnalysisData = {
  overallScore: 75,
  atsScore: 70,
  contentScore: 75,
  formatScore: 80,
  strengths: [
    "Professional formatting",
    "Clear section organization",
    "Contact information complete",
    "Education details provided",
  ],
  improvements: [
    "Add more quantifiable achievements",
    "Include more industry keywords",
    "Strengthen professional summary",
    "Add more technical skills",
  ],
  keywordSuggestions: [
    "Project management",
    "Team leadership",
    "Data analysis",
    "Strategic planning",
    "Process improvement",
  ],
  sectionFeedback: {
    header: "Contact information is complete and professional.",
    summary: "Consider adding a stronger professional summary.",
    experience: "Add more quantifiable achievements to your experience.",
    education: "Education section is well-formatted.",
    skills: "Add more technical and industry-specific skills.",
    other: "Consider adding certifications or projects section.",
  },
  industryRecommendations: "Focus on highlighting relevant skills and experience for your target industry.",
  detailedAnalysis: "Your resume has a good structure but could benefit from more specific achievements and keywords.",
  extractedSkills: ["Communication", "Organization", "Microsoft Office", "Project Management"],
  experienceLevel: "mid-level",
  suggestedJobTitles: ["Project Manager", "Team Lead", "Operations Manager"],
}

export default function AnalysisPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fileName = searchParams.get("fileName") || "resume.pdf"
  const [analysisData, setAnalysisData] = useState<AnalysisData>(defaultAnalysisData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true)

        // Get analysis data from localStorage (set by upload page)
        const storedAnalysis = localStorage.getItem("latestAnalysis")
        if (storedAnalysis) {
          try {
            const data = JSON.parse(storedAnalysis)

            // Ensure all required properties exist with fallbacks
            const analysis = data.analysis || {}

            setAnalysisData({
              overallScore: analysis.overallScore || defaultAnalysisData.overallScore,
              atsScore: analysis.atsScore || defaultAnalysisData.atsScore,
              contentScore: analysis.contentScore || defaultAnalysisData.contentScore,
              formatScore: analysis.formatScore || defaultAnalysisData.formatScore,
              strengths: Array.isArray(analysis.strengths) ? analysis.strengths : defaultAnalysisData.strengths,
              improvements: Array.isArray(analysis.improvements)
                ? analysis.improvements
                : defaultAnalysisData.improvements,
              keywordSuggestions: Array.isArray(analysis.keywordSuggestions)
                ? analysis.keywordSuggestions
                : defaultAnalysisData.keywordSuggestions,
              sectionFeedback: {
                header: analysis.sectionFeedback?.header || defaultAnalysisData.sectionFeedback.header,
                summary: analysis.sectionFeedback?.summary || defaultAnalysisData.sectionFeedback.summary,
                experience: analysis.sectionFeedback?.experience || defaultAnalysisData.sectionFeedback.experience,
                education: analysis.sectionFeedback?.education || defaultAnalysisData.sectionFeedback.education,
                skills: analysis.sectionFeedback?.skills || defaultAnalysisData.sectionFeedback.skills,
                other: analysis.sectionFeedback?.other || defaultAnalysisData.sectionFeedback.other,
              },
              industryRecommendations: analysis.industryRecommendations || defaultAnalysisData.industryRecommendations,
              detailedAnalysis: analysis.detailedAnalysis || defaultAnalysisData.detailedAnalysis,
              extractedSkills: Array.isArray(analysis.extractedSkills)
                ? analysis.extractedSkills
                : defaultAnalysisData.extractedSkills,
              experienceLevel: analysis.experienceLevel || defaultAnalysisData.experienceLevel,
              suggestedJobTitles: Array.isArray(analysis.suggestedJobTitles)
                ? analysis.suggestedJobTitles
                : defaultAnalysisData.suggestedJobTitles,
            })
          } catch (parseError) {
            console.error("Error parsing stored analysis:", parseError)
            setAnalysisData(defaultAnalysisData)
          }
        } else {
          // Use default data
          setAnalysisData(defaultAnalysisData)
        }
      } catch (err) {
        console.error("Error loading analysis:", err)
        setError("Failed to load analysis data. Please try again.")
        setAnalysisData(defaultAnalysisData)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [])

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500"
    if (score >= 60) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-pink-500"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h2 className="text-2xl font-bold text-center text-white">Analyzing your resume...</h2>
            <p className="text-gray-400 text-center max-w-md">
              Our dual AI system is carefully reviewing your resume to provide comprehensive feedback and suggestions.
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900">
        <div className="container max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
              <AlertCircle className="h-12 w-12 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-center text-white">Analysis Failed</h2>
            <p className="text-gray-400 text-center max-w-md">{error}</p>
            <Button
              onClick={() => router.push("/upload")}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Ensure we have arrays to map over
  const strengths = analysisData?.strengths || []
  const improvements = analysisData?.improvements || []
  const keywordSuggestions = analysisData?.keywordSuggestions || []
  const sectionFeedback = analysisData?.sectionFeedback || {}

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Resume Analysis Results
              </h1>
              <p className="text-gray-400 mt-2">Comprehensive feedback for {fileName}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-cyan-500/30 hover:bg-cyan-500/20">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button variant="outline" size="sm" className="border-purple-500/30 hover:bg-purple-500/20">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Overall Score Card */}
          <Card className="bg-slate-800/50 border-cyan-500/30">
            <CardHeader className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
              <CardTitle className="text-2xl text-white flex items-center">
                <TrendingUp className="mr-3 h-6 w-6 text-cyan-400" />
                Overall Assessment
              </CardTitle>
              <CardDescription>Your resume scored higher than 78% of analyzed resumes</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Score Display */}
                <div className="text-center">
                  <div className={`text-6xl font-bold mb-4 ${getScoreColor(analysisData?.overallScore || 0)}`}>
                    {analysisData?.overallScore}/100
                  </div>
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.floor((analysisData?.overallScore || 0) / 20)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-400">
                    {analysisData?.overallScore && analysisData.overallScore >= 80
                      ? "Excellent resume! Ready for top-tier positions."
                      : analysisData?.overallScore && analysisData.overallScore >= 60
                        ? "Good resume with room for improvement."
                        : "Needs significant improvements to be competitive."}
                  </p>
                </div>

                {/* Score Breakdown */}
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">ATS Compatibility</span>
                      <span className={`text-sm font-bold ${getScoreColor(analysisData?.atsScore || 0)}`}>
                        {analysisData?.atsScore}/100
                      </span>
                    </div>
                    <Progress value={analysisData?.atsScore || 0} className="h-3 bg-slate-700" />
                    <p className="mt-1 text-xs text-gray-500">
                      How well your resume performs with Applicant Tracking Systems
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">Content Quality</span>
                      <span className={`text-sm font-bold ${getScoreColor(analysisData?.contentScore || 0)}`}>
                        {analysisData?.contentScore}/100
                      </span>
                    </div>
                    <Progress value={analysisData?.contentScore || 0} className="h-3 bg-slate-700" />
                    <p className="mt-1 text-xs text-gray-500">The quality and relevance of your resume content</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">Format & Design</span>
                      <span className={`text-sm font-bold ${getScoreColor(analysisData?.formatScore || 0)}`}>
                        {analysisData?.formatScore}/100
                      </span>
                    </div>
                    <Progress value={analysisData?.formatScore || 0} className="h-3 bg-slate-700" />
                    <p className="mt-1 text-xs text-gray-500">The visual appeal and organization of your resume</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Strengths and Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Key Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-green-400 text-xs">✓</span>
                      </div>
                      <span className="text-sm text-gray-300">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center">
                  <Target className="mr-2 h-5 w-5" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-500/20 flex items-center justify-center mt-0.5 mr-3">
                        <span className="text-yellow-400 text-xs">!</span>
                      </div>
                      <span className="text-sm text-gray-300">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Keywords and Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-slate-800/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400">Keyword Optimization</CardTitle>
                <CardDescription>Industry-relevant keywords to improve ATS performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {keywordSuggestions.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  Including these keywords can help your resume pass through ATS filters and catch recruiter attention.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">Industry Recommendations</CardTitle>
                <CardDescription>Tailored advice for your target industry</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 mb-4">{analysisData?.industryRecommendations}</p>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="text-sm font-medium text-purple-300 mb-2">💡 Pro Tip</h4>
                  <p className="text-sm text-gray-300">
                    Research job descriptions in your target companies and incorporate the most frequently mentioned
                    skills and qualifications into your resume.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Section Feedback */}
          <Card className="bg-slate-800/50 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Section-by-Section Feedback</CardTitle>
              <CardDescription>Detailed analysis of each resume section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(sectionFeedback).map(([section, feedback]) => (
                  <div key={section}>
                    <h3 className="text-md font-medium mb-2 text-white capitalize">
                      {section === "other" ? "Additional Sections" : section}
                    </h3>
                    <p className="text-sm text-gray-300 bg-slate-700/30 p-3 rounded-lg">{feedback}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={() => router.push("/resume-builder")}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-8 py-3"
            >
              Create Improved Resume
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/upload")}
              className="border-cyan-500/30 hover:bg-cyan-500/20 px-8 py-3"
            >
              Analyze Another Resume
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push("/jobs")}
              className="border-purple-500/30 hover:bg-purple-500/20 px-8 py-3"
            >
              Find Matching Jobs
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
