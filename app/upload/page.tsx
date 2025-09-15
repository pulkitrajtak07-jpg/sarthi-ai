"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Upload, FileText, Zap, BarChart3, Target } from "lucide-react"
import { FileUploader } from "@/components/file-uploader"

export default function UploadPage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleUploadSuccess = (analysisData: any) => {
    // Store analysis data and redirect to results
    localStorage.setItem("latestAnalysis", JSON.stringify(analysisData))
    router.push(`/analysis?fileName=${analysisData.fileName}`)
  }

  const handleUploadError = (error: string) => {
    console.error("Upload error:", error)
    // Error is already displayed in the FileUploader component
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Upload className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              AI Resume Analyzer
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get instant, comprehensive feedback on your resume with our advanced AI technology powered by Gemini AI
              and Firebase AI
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 text-center"
            >
              <Zap className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Instant Analysis</h3>
              <p className="text-gray-400">Get results in seconds with our powerful AI engine</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-6 text-center"
            >
              <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Real ATS Score</h3>
              <p className="text-gray-400">Accurate ATS compatibility scoring using dual AI analysis</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6 text-center"
            >
              <Target className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Actionable Insights</h3>
              <p className="text-gray-400">Specific recommendations to improve your resume</p>
            </motion.div>
          </div>

          {/* File Uploader */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/50 border border-cyan-500/30 rounded-2xl p-8"
          >
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Upload Your Resume</h2>
              <p className="text-gray-400">Support for PDF, DOCX, DOC, JPG, PNG, and TXT files (max 10MB)</p>
            </div>

            <FileUploader onUploadSuccess={handleUploadSuccess} onUploadError={handleUploadError} />

            {isAnalyzing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2 text-cyan-400">
                  <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Analyzing your resume with dual AI technology...</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* How it Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 text-center"
          >
            <h3 className="text-2xl font-bold text-white mb-8">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
                  1
                </div>
                <h4 className="text-lg font-semibold text-white">Upload</h4>
                <p className="text-gray-400">Upload your resume in any supported format</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
                  2
                </div>
                <h4 className="text-lg font-semibold text-white">Analyze</h4>
                <p className="text-gray-400">Our dual AI system analyzes your resume comprehensively</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg">
                  3
                </div>
                <h4 className="text-lg font-semibold text-white">Improve</h4>
                <p className="text-gray-400">Get detailed feedback and actionable recommendations</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
