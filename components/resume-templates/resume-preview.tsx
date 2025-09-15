"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import ModernTemplate from "./templates/modern-template"
import ProfessionalTemplate from "./templates/professional-template"
import CreativeTemplate from "./templates/creative-template"
import MinimalistTemplate from "./templates/minimalist-template"
import TechTemplate from "./templates/tech-template"
import ExecutiveTemplate from "./templates/executive-template"
import DownloadOptions from "./download-options"

interface ResumePreviewProps {
  resumeData: any
  template?: string
  isLoading?: boolean
}

export default function ResumePreview({ resumeData, template = "modern", isLoading = false }: ResumePreviewProps) {
  const [activeTemplate, setActiveTemplate] = useState(template)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (template) {
      setActiveTemplate(template)
    }
  }, [template])

  const templates = [
    { id: "modern", name: "Modern", component: ModernTemplate, color: "bg-blue-500" },
    { id: "professional", name: "Professional", component: ProfessionalTemplate, color: "bg-gray-600" },
    { id: "creative", name: "Creative", component: CreativeTemplate, color: "bg-purple-500" },
    { id: "minimalist", name: "Minimalist", component: MinimalistTemplate, color: "bg-green-500" },
    { id: "tech", name: "Tech", component: TechTemplate, color: "bg-gray-800" },
    { id: "executive", name: "Executive", component: ExecutiveTemplate, color: "bg-indigo-600" },
  ]

  const renderTemplate = () => {
    const selectedTemplate = templates.find((t) => t.id === activeTemplate)
    if (selectedTemplate) {
      const TemplateComponent = selectedTemplate.component
      return <TemplateComponent resumeData={resumeData} />
    }
    return <ModernTemplate resumeData={resumeData} />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs value={activeTemplate} onValueChange={setActiveTemplate} className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
            {templates.map((tmpl) => (
              <TabsTrigger
                key={tmpl.id}
                value={tmpl.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-purple-500"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${tmpl.color}`}></div>
                  <span className="hidden sm:inline">{tmpl.name}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 ml-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              -
            </button>
            <span className="text-sm min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale((prev) => Math.min(1.5, prev + 0.1))}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              +
            </button>
          </div>

          <DownloadOptions resumeId="resume-preview" />
        </div>
      </div>

      <div className="flex justify-center overflow-auto p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div
          style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
          className="transition-transform duration-200"
        >
          <Card id="resume-preview" className="w-[210mm] min-h-[297mm] bg-white shadow-lg overflow-hidden">
            {renderTemplate()}
          </Card>
        </div>
      </div>
    </div>
  )
}
