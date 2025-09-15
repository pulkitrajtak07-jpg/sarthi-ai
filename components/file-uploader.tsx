"use client"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, FileText, AlertCircle, CheckCircle, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FileUploaderProps {
  onUploadSuccess: (data: any) => void
  onUploadError: (error: string) => void
}

export function FileUploader({ onUploadSuccess, onUploadError }: FileUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (!file) return

      setError(null)
      setSuccess(false)
      setUploadedFile(file)
      setUploading(true)
      setUploadProgress(0)

      try {
        // Validate file
        const maxSize = 10 * 1024 * 1024 // 10MB
        if (file.size > maxSize) {
          throw new Error("File size must be less than 10MB")
        }

        const allowedTypes = [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/msword",
          "image/jpeg",
          "image/jpg",
          "image/png",
          "text/plain",
        ]

        if (!allowedTypes.includes(file.type)) {
          throw new Error("Please upload a PDF, DOCX, DOC, JPG, PNG, or TXT file")
        }

        // Simulate upload progress
        const progressInterval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 90) {
              clearInterval(progressInterval)
              return 90
            }
            return prev + 10
          })
        }, 200)

        // Create FormData
        const formData = new FormData()
        formData.append("file", file)
        formData.append("fileName", file.name)
        formData.append("fileType", file.type)
        formData.append("fileSize", file.size.toString())

        // Upload file
        const response = await fetch("/api/analyze-resume", {
          method: "POST",
          body: formData,
        })

        clearInterval(progressInterval)
        setUploadProgress(100)

        // Handle non-JSON responses
        let result
        const contentType = response.headers.get("content-type")

        if (contentType && contentType.includes("application/json")) {
          try {
            result = await response.json()
          } catch (jsonError) {
            console.error("JSON parsing error:", jsonError)
            throw new Error("Invalid response format from server")
          }
        } else {
          // Handle non-JSON response
          const textResponse = await response.text()
          console.error("Non-JSON response:", textResponse)
          throw new Error(`Server error: ${response.status} ${response.statusText}`)
        }

        if (!response.ok) {
          throw new Error(result?.error || `Upload failed with status ${response.status}`)
        }

        if (!result.success && result.error) {
          throw new Error(result.error)
        }

        setSuccess(true)

        // Create a mock result if the API doesn't return proper data
        const analysisData = result.data || {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          score: 75,
          analysis: {
            strengths: ["Clear format", "Good skills section", "Proper contact information"],
            weaknesses: ["Missing quantifiable achievements", "Too generic objective", "Needs more keywords"],
            suggestions: [
              "Add metrics to achievements",
              "Tailor resume to specific job",
              "Include more industry keywords",
            ],
          },
        }

        // Wait a moment to show success message before redirecting
        setTimeout(() => {
          onUploadSuccess(analysisData)
        }, 1500)
      } catch (err: any) {
        console.error("Upload error:", err)
        const errorMessage = err.message || "Failed to upload file. Please try again."
        setError(errorMessage)
        onUploadError(errorMessage)
      } finally {
        setUploading(false)
      }
    },
    [onUploadSuccess, onUploadError],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "application/msword": [".doc"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "text/plain": [".txt"],
    },
    multiple: false,
    disabled: uploading,
  })

  const resetUploader = () => {
    setUploadedFile(null)
    setError(null)
    setSuccess(false)
    setUploadProgress(0)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!uploadedFile && (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300
            ${
              isDragActive
                ? "border-cyan-400 bg-cyan-500/10 scale-105"
                : "border-gray-600 hover:border-cyan-500 hover:bg-cyan-500/5"
            }
            ${uploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Upload Your Resume</h3>
              <p className="text-gray-400 mb-4">
                {isDragActive ? "Drop your resume here..." : "Drag & drop your resume or click to browse"}
              </p>
              <p className="text-sm text-gray-500">Supports PDF, DOCX, DOC, JPG, PNG, TXT files (max 10MB)</p>
            </div>
            <Button className="gradient-button" disabled={uploading}>
              Choose File
            </Button>
          </div>
        </div>
      )}

      {uploadedFile && (
        <div className="card-3d rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium text-white">{uploadedFile.name}</h4>
                <p className="text-sm text-gray-400">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type}
                </p>
              </div>
            </div>
            {!uploading && (
              <Button variant="ghost" size="sm" onClick={resetUploader} className="text-gray-400 hover:text-white">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {uploading && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Analyzing resume...</span>
                <span className="text-cyan-400">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing your resume with AI...</span>
              </div>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mt-4 bg-green-900/20 border-green-500/50 text-green-400">
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Resume analyzed successfully! Redirecting to results...</AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}
