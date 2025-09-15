import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"

export async function exportToPdf(elementId: string, filename = "resume.pdf") {
  try {
    const element = document.getElementById(elementId)
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`)
    }

    // Create a clone of the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement

    // Apply print styles to the clone
    clone.style.width = "8.5in"
    clone.style.minHeight = "11in"
    clone.style.padding = "0.5in"
    clone.style.backgroundColor = "white"
    clone.style.color = "black"
    clone.style.position = "absolute"
    clone.style.left = "-9999px"
    clone.style.top = "-9999px"

    // Add the clone to the document
    document.body.appendChild(clone)

    // Wait for images to load
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Create canvas from the element
    const canvas = await html2canvas(clone, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    // Remove the clone from the document
    document.body.removeChild(clone)

    // Calculate dimensions
    const imgWidth = 8.5
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    // Create PDF
    const pdf = new jsPDF({
      unit: "in",
      format: [8.5, 11],
    })

    // Add image to PDF
    const imgData = canvas.toDataURL("image/png")
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

    // Save PDF
    pdf.save(filename)

    return true
  } catch (error) {
    console.error("Error exporting to PDF:", error)
    return false
  }
}

// Add exportToPDF with capital PDF to satisfy imports
export const exportToPDF = exportToPdf

export async function exportToDocx(elementId: string, filename = "resume.docx") {
  // This is a placeholder for DOCX export functionality
  // In a real implementation, you would use a library like docx.js
  alert("DOCX export functionality will be implemented soon!")
}

export default exportToPdf
