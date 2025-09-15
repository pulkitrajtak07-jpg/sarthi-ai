"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import SpaceLayout from "@/components/space-layout"
import ResumeTemplateCard from "@/components/resume-templates/resume-template-card"
import { motion } from "framer-motion"

const templates = [
  {
    id: "modern",
    name: "Modern",
    description: "Clean and professional design with a touch of color",
    thumbnail: "/images/template-modern.png",
  },
  {
    id: "creative",
    name: "Creative",
    description: "Stand out with a unique layout and vibrant accents",
    thumbnail: "/images/template-creative.png",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Traditional format preferred by recruiters and ATS systems",
    thumbnail: "/images/template-professional.png",
  },
  {
    id: "space",
    name: "Space",
    description: "Futuristic design with a cosmic theme",
    thumbnail: "/images/template-space.png",
  },
  {
    id: "neon",
    name: "Neon",
    description: "Bold and vibrant design with neon accents",
    thumbnail: "/images/template-neon.png",
  },
  {
    id: "woodworking",
    name: "Craftsman",
    description: "Rustic design perfect for trades and crafts",
    thumbnail: "/images/template-woodworking.png",
  },
]

export default function ResumeBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState("modern")

  return (
    <SpaceLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4 neon-text"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Choose Your Resume Template
          </motion.h1>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Select a template that best represents your professional style. You can customize colors and layout in the
            next step.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {templates.map((template, index) => (
            <ResumeTemplateCard
              key={template.id}
              template={template}
              isSelected={selectedTemplate === template.id}
              onSelect={setSelectedTemplate}
            />
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button asChild size="lg" className="neon-button">
            <a href={`/resume-builder/editor?template=${selectedTemplate}`}>
              <Sparkles className="mr-2 h-5 w-5" /> Continue to Editor <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </motion.div>
      </div>
    </SpaceLayout>
  )
}
