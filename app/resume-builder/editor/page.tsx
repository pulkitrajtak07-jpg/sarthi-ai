"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { geminiAI } from "@/lib/gemini-ai-service"
import { Save, Download, MessageSquare, Sparkles, Loader2, X, Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react"
import ResumePreview from "@/components/resume-templates/resume-preview"
import AIChatAssistant from "@/components/ai-chat-assistant"
import { exportToPdf } from "@/lib/pdf-export"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Initial resume structure
const initialResumeData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
  },
  summary: "",
  experience: [
    {
      id: "exp-1",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ],
  education: [
    {
      id: "edu-1",
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  skills: [],
  projects: [
    {
      id: "proj-1",
      title: "",
      description: "",
      technologies: "",
      link: "",
    },
  ],
  certifications: [],
  languages: [],
}

export default function ResumeEditorPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template") || "modern"
  const resumeId = searchParams.get("id")

  const [resumeData, setResumeData] = useState(initialResumeData)
  const [activeTab, setActiveTab] = useState("personal")
  const [isSaving, setIsSaving] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showChatAssistant, setShowChatAssistant] = useState(false)
  const [resumeTitle, setResumeTitle] = useState("My Resume")
  const [jobTitle, setJobTitle] = useState("")
  const [skillsInput, setSkillsInput] = useState("")
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchResumeData = async () => {
      if (!resumeId || !user) return

      try {
        // For now, use localStorage
        const savedResume = localStorage.getItem(`resume_${resumeId}`)
        if (savedResume) {
          const resumeData = JSON.parse(savedResume)
          setResumeData(resumeData.content || initialResumeData)
          setResumeTitle(resumeData.title || "My Resume")
        } else {
          // Set default values
          setResumeData({
            ...initialResumeData,
            personalInfo: {
              ...initialResumeData.personalInfo,
              name: user.user_metadata?.full_name || user.user_metadata?.display_name || "",
              email: user.email || "",
            },
          })
        }
      } catch (error) {
        console.error("Error fetching resume:", error)
        setResumeData({
          ...initialResumeData,
          personalInfo: {
            ...initialResumeData.personalInfo,
            name: user.user_metadata?.full_name || user.user_metadata?.display_name || "",
            email: user.email || "",
          },
        })
      }
    }

    if (user) {
      fetchResumeData()
    }
  }, [resumeId, user])

  const handleInputChange = (section: string, field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  const handleArrayInputChange = (section: string, index: number, field: string, value: string | boolean) => {
    setResumeData((prev) => {
      const newArray = [...prev[section]]
      newArray[index] = {
        ...newArray[index],
        [field]: value,
      }
      return {
        ...prev,
        [section]: newArray,
      }
    })
  }

  const addArrayItem = (section: string, template: any) => {
    setResumeData((prev) => {
      const newItem = {
        ...template,
        id: `${section.slice(0, 3)}-${Date.now()}`,
      }
      return {
        ...prev,
        [section]: [...prev[section], newItem],
      }
    })
  }

  const removeArrayItem = (section: string, index: number) => {
    setResumeData((prev) => {
      const newArray = [...prev[section]]
      newArray.splice(index, 1)
      return {
        ...prev,
        [section]: newArray,
      }
    })
  }

  const moveArrayItem = (section: string, index: number, direction: "up" | "down") => {
    setResumeData((prev) => {
      const newArray = [...prev[section]]
      const newIndex = direction === "up" ? index - 1 : index + 1

      if (newIndex < 0 || newIndex >= newArray.length) return prev

      const temp = newArray[index]
      newArray[index] = newArray[newIndex]
      newArray[newIndex] = temp

      return {
        ...prev,
        [section]: newArray,
      }
    })
  }

  const handleSkillsChange = (skillsString: string) => {
    setSkillsInput(skillsString)
    const skillsArray = skillsString
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill !== "")
    setResumeData((prev) => ({
      ...prev,
      skills: skillsArray,
    }))
  }

  const handleLanguagesChange = (languagesString: string) => {
    const languagesArray = languagesString
      .split(",")
      .map((language) => language.trim())
      .filter((language) => language !== "")
    setResumeData((prev) => ({
      ...prev,
      languages: languagesArray,
    }))
  }

  const handleSaveResume = async () => {
    if (!user) return

    setIsSaving(true)
    setSaveMessage("")

    try {
      const resumePayload = {
        id: resumeId || Date.now().toString(),
        user_id: user.id,
        title: resumeTitle,
        content: resumeData,
        template: templateId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      // Save to localStorage for now
      localStorage.setItem(`resume_${resumePayload.id}`, JSON.stringify(resumePayload))

      // Also save to a list of user resumes
      const userResumes = JSON.parse(localStorage.getItem(`user_resumes_${user.id}`) || "[]")
      const existingIndex = userResumes.findIndex((r: any) => r.id === resumePayload.id)

      if (existingIndex >= 0) {
        userResumes[existingIndex] = resumePayload
      } else {
        userResumes.push(resumePayload)
      }

      localStorage.setItem(`user_resumes_${user.id}`, JSON.stringify(userResumes))

      setSaveMessage("Resume saved successfully!")
      setTimeout(() => setSaveMessage(""), 3000)
    } catch (error) {
      console.error("Error saving resume:", error)
      setSaveMessage("Error saving resume. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const generateAIContent = async (section: string, prompt: string) => {
    setIsGenerating(true)
    try {
      const response = await geminiAI.generateText(prompt)
      return response
    } catch (error) {
      console.error("Error generating content:", error)
      return "AI content generation is currently unavailable. Please write your content manually."
    } finally {
      setIsGenerating(false)
    }
  }

  const generateSummary = async () => {
    const jobTitle = resumeData.experience[0]?.title || "professional"
    const prompt = `Write a professional summary for a ${jobTitle} resume. The summary should be concise (3-4 sentences), highlight key strengths, and be written in first person. Make it sound professional and confident.`

    const summary = await generateAIContent("summary", prompt)
    if (summary) {
      setResumeData((prev) => ({
        ...prev,
        summary,
      }))
    }
  }

  const enhanceExperienceDescription = async (index: number) => {
    const experience = resumeData.experience[index]
    if (!experience.title || !experience.company) return

    const prompt = `Enhance the following job description for a ${experience.title} position at ${experience.company}. 
    Focus on achievements and quantifiable results. Use bullet points and action verbs. 
    Make it ATS-friendly with relevant keywords for this role.
    
    Current description: ${experience.description || "No description provided."}`

    const enhancedDescription = await generateAIContent("experience", prompt)
    if (enhancedDescription) {
      handleArrayInputChange("experience", index, "description", enhancedDescription)
    }
  }

  const generateSkills = async () => {
    if (!jobTitle) return

    const prompt = `Generate a comma-separated list of 10-12 relevant skills for a ${jobTitle} position. Include both technical and soft skills.`

    const skills = await generateAIContent("skills", prompt)
    if (skills) {
      setSkillsInput(skills)
      handleSkillsChange(skills)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      await exportToPdf(resumeData, templateId, resumeTitle)
    } catch (error) {
      console.error("Error exporting PDF:", error)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8 px-4 bg-gray-50 dark:bg-gray-900 cyber-bg">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Editor Panel */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold neon-text-blue floating">Resume Builder</h1>
                  <p className="text-gray-600 dark:text-gray-300">Create and customize your professional resume</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowChatAssistant(!showChatAssistant)}
                    className="flex items-center neon-button-purple"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Sarthi AI
                  </Button>
                  <Button onClick={handleSaveResume} className="neon-button-blue" disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" /> Save
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {saveMessage && (
                <Alert className="border-green-500/50 bg-green-500/10">
                  <AlertDescription className="text-green-400">{saveMessage}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center space-x-4">
                <Label htmlFor="resumeTitle">Resume Title:</Label>
                <Input
                  id="resumeTitle"
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                  className="max-w-xs bg-gray-900/50"
                />
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6 bg-gray-900/50 neon-border-blue">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4">
                  <Card className="neon-card-blue floating">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-semibold mb-4 neon-text-blue">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={resumeData.personalInfo.name}
                            onChange={(e) => handleInputChange("personalInfo", "name", e.target.value)}
                            className="bg-gray-900/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => handleInputChange("personalInfo", "email", e.target.value)}
                            className="bg-gray-900/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => handleInputChange("personalInfo", "phone", e.target.value)}
                            className="bg-gray-900/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={resumeData.personalInfo.location}
                            onChange={(e) => handleInputChange("personalInfo", "location", e.target.value)}
                            placeholder="City, State"
                            className="bg-gray-900/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={resumeData.personalInfo.linkedin}
                            onChange={(e) => handleInputChange("personalInfo", "linkedin", e.target.value)}
                            placeholder="linkedin.com/in/username"
                            className="bg-gray-900/50"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website/Portfolio</Label>
                          <Input
                            id="website"
                            value={resumeData.personalInfo.website}
                            onChange={(e) => handleInputChange("personalInfo", "website", e.target.value)}
                            placeholder="yourwebsite.com"
                            className="bg-gray-900/50"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="summary" className="space-y-4">
                  <Card className="neon-card-purple floating-slow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold neon-text-purple">Professional Summary</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={generateSummary}
                          disabled={isGenerating}
                          className="flex items-center neon-button-purple bg-transparent"
                        >
                          {isGenerating ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <Sparkles className="h-4 w-4 mr-2" />
                          )}
                          Generate with Sarthi AI
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Textarea
                          value={resumeData.summary}
                          onChange={(e) => setResumeData((prev) => ({ ...prev, summary: e.target.value }))}
                          placeholder="Write a brief summary of your professional background and key strengths..."
                          rows={6}
                          className="bg-gray-900/50"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          A strong summary highlights your key qualifications and career goals in 3-4 sentences.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  <Card className="neon-card-green floating">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold neon-text-green">Work Experience</h3>
                        <Button
                          onClick={() =>
                            addArrayItem("experience", {
                              title: "",
                              company: "",
                              location: "",
                              startDate: "",
                              endDate: "",
                              current: false,
                              description: "",
                            })
                          }
                          className="flex items-center neon-button-green"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>

                      {resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className="border border-gray-700 rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Experience {index + 1}</h4>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => enhanceExperienceDescription(index)}
                                disabled={isGenerating}
                                className="flex items-center"
                              >
                                {isGenerating ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <Sparkles className="h-4 w-4 mr-1" />
                                )}
                                Enhance
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveArrayItem("experience", index, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveArrayItem("experience", index, "down")}
                                disabled={index === resumeData.experience.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayItem("experience", index)}
                                disabled={resumeData.experience.length === 1}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Job Title</Label>
                              <Input
                                value={exp.title}
                                onChange={(e) => handleArrayInputChange("experience", index, "title", e.target.value)}
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Company</Label>
                              <Input
                                value={exp.company}
                                onChange={(e) => handleArrayInputChange("experience", index, "company", e.target.value)}
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Location</Label>
                              <Input
                                value={exp.location}
                                onChange={(e) =>
                                  handleArrayInputChange("experience", index, "location", e.target.value)
                                }
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) =>
                                  handleArrayInputChange("experience", index, "startDate", e.target.value)
                                }
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={exp.endDate}
                                onChange={(e) => handleArrayInputChange("experience", index, "endDate", e.target.value)}
                                disabled={exp.current}
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={`current-${index}`}
                                checked={exp.current}
                                onChange={(e) =>
                                  handleArrayInputChange("experience", index, "current", e.target.checked)
                                }
                                className="rounded"
                              />
                              <Label htmlFor={`current-${index}`}>Currently working here</Label>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={exp.description}
                              onChange={(e) =>
                                handleArrayInputChange("experience", index, "description", e.target.value)
                              }
                              placeholder="Describe your responsibilities and achievements..."
                              rows={4}
                              className="bg-gray-900/50"
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  <Card className="neon-card-cyan floating-slow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold neon-text-cyan">Education</h3>
                        <Button
                          onClick={() =>
                            addArrayItem("education", {
                              degree: "",
                              institution: "",
                              location: "",
                              startDate: "",
                              endDate: "",
                              description: "",
                            })
                          }
                          className="flex items-center neon-button-cyan"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Education
                        </Button>
                      </div>

                      {resumeData.education.map((edu, index) => (
                        <div key={edu.id} className="border border-gray-700 rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Education {index + 1}</h4>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveArrayItem("education", index, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveArrayItem("education", index, "down")}
                                disabled={index === resumeData.education.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayItem("education", index)}
                                disabled={resumeData.education.length === 1}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input
                                value={edu.degree}
                                onChange={(e) => handleArrayInputChange("education", index, "degree", e.target.value)}
                                placeholder="Bachelor of Science in Computer Science"
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Institution</Label>
                              <Input
                                value={edu.institution}
                                onChange={(e) =>
                                  handleArrayInputChange("education", index, "institution", e.target.value)
                                }
                                placeholder="University Name"
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Location</Label>
                              <Input
                                value={edu.location}
                                onChange={(e) => handleArrayInputChange("education", index, "location", e.target.value)}
                                placeholder="City, State"
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Start Date</Label>
                              <Input
                                type="month"
                                value={edu.startDate}
                                onChange={(e) =>
                                  handleArrayInputChange("education", index, "startDate", e.target.value)
                                }
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>End Date</Label>
                              <Input
                                type="month"
                                value={edu.endDate}
                                onChange={(e) => handleArrayInputChange("education", index, "endDate", e.target.value)}
                                className="bg-gray-900/50"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Description (Optional)</Label>
                            <Textarea
                              value={edu.description}
                              onChange={(e) =>
                                handleArrayInputChange("education", index, "description", e.target.value)
                              }
                              placeholder="GPA, relevant coursework, achievements..."
                              rows={3}
                              className="bg-gray-900/50"
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <Card className="neon-card-cyan floating-fast">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold neon-text-cyan">Skills</h3>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center neon-button-cyan bg-transparent"
                            >
                              <Sparkles className="h-4 w-4 mr-2" /> Generate Skills
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-gray-900 border-gray-700">
                            <DialogHeader>
                              <DialogTitle className="neon-text-cyan">Generate Skills with Sarthi AI</DialogTitle>
                              <DialogDescription>
                                Enter your job title or field to generate relevant skills
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="job-title">Job Title or Field</Label>
                                <Input
                                  id="job-title"
                                  placeholder="e.g., Frontend Developer"
                                  value={jobTitle}
                                  onChange={(e) => setJobTitle(e.target.value)}
                                  className="bg-gray-800"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={generateSkills}
                                disabled={!jobTitle || isGenerating}
                                className="neon-button-cyan"
                              >
                                {isGenerating ? (
                                  <>
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                    Generating...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles className="h-4 w-4 mr-2" /> Generate Skills
                                  </>
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="skills">Skills (comma separated)</Label>
                        <Textarea
                          id="skills"
                          value={skillsInput || resumeData.skills.join(", ")}
                          onChange={(e) => handleSkillsChange(e.target.value)}
                          placeholder="JavaScript, React, Node.js, UI/UX Design, Project Management..."
                          rows={4}
                          className="bg-gray-900/50"
                        />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          List both technical and soft skills relevant to your target role.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="projects" className="space-y-4">
                  <Card className="neon-card-purple floating">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold neon-text-purple">Projects</h3>
                        <Button
                          onClick={() =>
                            addArrayItem("projects", {
                              title: "",
                              description: "",
                              technologies: "",
                              link: "",
                            })
                          }
                          className="flex items-center neon-button-purple"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Project
                        </Button>
                      </div>

                      {resumeData.projects.map((project, index) => (
                        <div key={project.id} className="border border-gray-700 rounded-lg p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium">Project {index + 1}</h4>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveArrayItem("projects", index, "up")}
                                disabled={index === 0}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => moveArrayItem("projects", index, "down")}
                                disabled={index === resumeData.projects.length - 1}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeArrayItem("projects", index)}
                                disabled={resumeData.projects.length === 1}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Project Title</Label>
                              <Input
                                value={project.title}
                                onChange={(e) => handleArrayInputChange("projects", index, "title", e.target.value)}
                                placeholder="Project Name"
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Technologies Used</Label>
                              <Input
                                value={project.technologies}
                                onChange={(e) =>
                                  handleArrayInputChange("projects", index, "technologies", e.target.value)
                                }
                                placeholder="React, Node.js, MongoDB"
                                className="bg-gray-900/50"
                              />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                              <Label>Project Link (Optional)</Label>
                              <Input
                                value={project.link}
                                onChange={(e) => handleArrayInputChange("projects", index, "link", e.target.value)}
                                placeholder="https://github.com/username/project"
                                className="bg-gray-900/50"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                              value={project.description}
                              onChange={(e) => handleArrayInputChange("projects", index, "description", e.target.value)}
                              placeholder="Describe the project, your role, and key achievements..."
                              rows={4}
                              className="bg-gray-900/50"
                            />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Preview Panel */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="sticky top-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold neon-text-green">Preview</h2>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex items-center neon-button-green bg-transparent"
                      onClick={handleDownloadPDF}
                    >
                      <Download className="h-4 w-4 mr-2" /> Download PDF
                    </Button>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm overflow-hidden neon-border-green">
                  <div className="p-4 h-[800px] overflow-y-auto">
                    <ResumePreview resumeData={resumeData} templateId={templateId} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Chat Assistant */}
          {showChatAssistant && (
            <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col neon-border-purple floating z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 text-emerald-600 mr-2 neon-text-purple" />
                  <h3 className="font-semibold neon-text-purple">Sarthi AI Assistant</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setShowChatAssistant(false)} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <AIChatAssistant resumeData={resumeData} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
