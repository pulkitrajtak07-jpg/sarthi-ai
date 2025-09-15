"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

interface ResumeTemplateCardProps {
  template: {
    id: string
    name: string
    description: string
    thumbnail: string
  }
  isSelected: boolean
  onSelect: (templateId: string) => void
}

export default function ResumeTemplateCard({ template, isSelected, onSelect }: ResumeTemplateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
    >
      <Card
        className={`overflow-hidden transition-all duration-300 ${
          isSelected
            ? "ring-2 ring-cyan-500 dark:ring-cyan-400"
            : "hover:shadow-md dark:bg-gray-800/30 dark:border-gray-700"
        } ${isSelected ? "glow-card" : "bg-gray-800/30 border-gray-700"}`}
      >
        <div className="relative aspect-[3/4] overflow-hidden group">
          <img
            src={template.thumbnail || "/placeholder.svg"}
            alt={`${template.name} template preview`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <Button
              variant={isSelected ? "default" : "outline"}
              className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isSelected ? "neon-button" : "bg-white/90 text-gray-900 hover:bg-white"
              }`}
              onClick={() => onSelect(template.id)}
            >
              {isSelected ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Selected
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" /> Select Template
                </>
              )}
            </Button>
          </div>
          {isSelected && (
            <div className="absolute top-3 right-3 bg-cyan-500 text-white p-1 rounded-full animate-pulse-glow">
              <Check className="h-4 w-4" />
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className={`font-semibold text-lg ${isSelected ? "text-cyan-400" : "text-white"}`}>{template.name}</h3>
          <p className="text-sm text-gray-400 mt-1">{template.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
