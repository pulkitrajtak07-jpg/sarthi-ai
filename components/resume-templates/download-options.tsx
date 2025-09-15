"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, Loader2, FileText, FileIcon as FilePdf } from "lucide-react"
import { exportToPDF, exportToDocx } from "@/lib/pdf-export"

interface DownloadOptionsProps {
  resumeId: string
}

export default function DownloadOptions({ resumeId }: DownloadOptionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [format, setFormat] = useState<string | null>(null)

  const handleDownload = async (format: string) => {
    setFormat(format)
    setIsLoading(true)

    try {
      if (format === "pdf") {
        await exportToPDF(resumeId, "resume.pdf")
      } else if (format === "docx") {
        await exportToDocx(resumeId, "resume.docx")
      }
    } catch (error) {
      console.error(`Error exporting to ${format}:`, error)
      alert(`Failed to export as ${format.toUpperCase()}. Please try again.`)
    } finally {
      setIsLoading(false)
      setFormat(null)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Exporting as {format?.toUpperCase()}...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleDownload("pdf")} disabled={isLoading}>
          <FilePdf className="mr-2 h-4 w-4" /> PDF Format
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleDownload("docx")} disabled={isLoading}>
          <FileText className="mr-2 h-4 w-4" /> DOCX Format
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
