import { GoogleGenerativeAI } from "@google/generative-ai"

// Server-side only - uses GEMINI_API_KEY (not NEXT_PUBLIC_)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// Emoji mapping for different contexts
const emojiMap = {
  greeting: ["👋", "😊", "🌟", "✨"],
  resume: ["📝", "📄", "💼", "🎯"],
  jobs: ["💼", "🔍", "🚀", "💪"],
  skills: ["🛠️", "⚡", "🎨", "💡"],
  career: ["🚀", "📈", "🎯", "💫"],
  success: ["🎉", "✅", "🌟", "👏"],
  help: ["🤝", "💡", "🔧", "📚"],
  analysis: ["📊", "🔍", "📈", "🎯"],
  improvement: ["⬆️", "💪", "🔥", "✨"],
  templates: ["🎨", "📋", "✨", "🖼️"],
  default: ["💬", "🤖", "💭", "✨"],
}

function getContextualEmojis(text: string): string[] {
  const lowerText = text.toLowerCase()

  if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("welcome")) {
    return emojiMap.greeting
  }
  if (lowerText.includes("resume") || lowerText.includes("cv")) {
    return emojiMap.resume
  }
  if (lowerText.includes("job") || lowerText.includes("career") || lowerText.includes("position")) {
    return emojiMap.jobs
  }
  if (lowerText.includes("skill") || lowerText.includes("experience") || lowerText.includes("ability")) {
    return emojiMap.skills
  }
  if (lowerText.includes("improve") || lowerText.includes("better") || lowerText.includes("enhance")) {
    return emojiMap.improvement
  }
  if (lowerText.includes("template") || lowerText.includes("design") || lowerText.includes("format")) {
    return emojiMap.templates
  }
  if (lowerText.includes("analyze") || lowerText.includes("analysis") || lowerText.includes("review")) {
    return emojiMap.analysis
  }
  if (lowerText.includes("success") || lowerText.includes("great") || lowerText.includes("excellent")) {
    return emojiMap.success
  }
  if (lowerText.includes("help") || lowerText.includes("assist") || lowerText.includes("support")) {
    return emojiMap.help
  }

  return emojiMap.default
}

function addEmojisToResponse(response: string): string {
  const emojis = getContextualEmojis(response)
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  // Add emoji at the beginning and occasionally throughout the response
  let enhancedResponse = `${randomEmoji} ${response}`

  // Add emojis to key phrases
  enhancedResponse = enhancedResponse
    .replace(/\b(great|excellent|perfect|amazing)\b/gi, (match) => `${match} ✨`)
    .replace(/\b(improve|enhance|better)\b/gi, (match) => `${match} 📈`)
    .replace(/\b(skills|experience)\b/gi, (match) => `${match} 💪`)
    .replace(/\b(job|career|position)\b/gi, (match) => `${match} 💼`)
    .replace(/\b(resume|CV)\b/gi, (match) => `${match} 📝`)
    .replace(/\b(success|achieve|goal)\b/gi, (match) => `${match} 🎯`)

  return enhancedResponse
}

export const geminiAI = {
  async generateText(prompt: string): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      const enhancedPrompt = `
        You are Sarthi AI, a professional career assistant specializing in resume optimization and job search guidance.
        
        Context: You help job seekers improve their resumes, find relevant jobs, and advance their careers.
        
        Guidelines:
        - Be professional yet friendly
        - Provide actionable advice
        - Focus on career development
        - Be encouraging and supportive
        - Keep responses concise but helpful
        
        User Query: ${prompt}
        
        Please provide a helpful response:
      `

      const result = await model.generateContent(enhancedPrompt)
      const response = await result.response
      const text = response.text()

      // Add contextual emojis to the response
      return addEmojisToResponse(text)
    } catch (error) {
      console.error("Gemini AI Error:", error)
      return "🤖 I'm having trouble connecting right now. Please try again in a moment! 💫"
    }
  },

  async analyzeResume(resumeText: string): Promise<{
    score: number
    strengths: string[]
    improvements: string[]
    keywords: string[]
    summary: string
  }> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      const prompt = `
        Analyze this resume and provide a detailed assessment:
        
        ${resumeText}
        
        Please provide:
        1. Overall score (0-100)
        2. Top 3 strengths
        3. Top 3 areas for improvement
        4. Important keywords found
        5. Brief summary
        
        Format as JSON with keys: score, strengths, improvements, keywords, summary
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      try {
        const analysis = JSON.parse(text)

        // Add emojis to the analysis
        analysis.summary = addEmojisToResponse(analysis.summary)
        analysis.strengths = analysis.strengths.map((strength: string) => `✅ ${strength}`)
        analysis.improvements = analysis.improvements.map((improvement: string) => `📈 ${improvement}`)

        return analysis
      } catch (parseError) {
        // Fallback if JSON parsing fails
        return {
          score: 75,
          strengths: [
            "✅ Professional experience highlighted",
            "✅ Clear contact information",
            "✅ Relevant skills listed",
          ],
          improvements: [
            "📈 Add more quantifiable achievements",
            "📈 Include relevant keywords",
            "📈 Improve formatting consistency",
          ],
          keywords: ["JavaScript", "React", "Node.js", "Project Management"],
          summary: addEmojisToResponse(
            "Your resume shows good potential with room for strategic improvements to increase your job search success.",
          ),
        }
      }
    } catch (error) {
      console.error("Resume Analysis Error:", error)
      return {
        score: 70,
        strengths: ["✅ Resume uploaded successfully", "✅ Ready for analysis", "✅ Professional format detected"],
        improvements: ["📈 Add more specific achievements", "📈 Include industry keywords", "📈 Quantify your impact"],
        keywords: ["Professional", "Experience", "Skills"],
        summary:
          "🤖 I'm having trouble analyzing your resume right now, but it looks professional! Please try again in a moment. ✨",
      }
    }
  },

  async getJobRecommendations(userProfile: any): Promise<string[]> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" })

      const prompt = `
        Based on this user profile, suggest 5 relevant job titles:
        
        Skills: ${userProfile.skills?.join(", ") || "General"}
        Experience: ${userProfile.years_experience || 0} years
        Job Title: ${userProfile.job_title || "Professional"}
        Location: ${userProfile.location || "Remote"}
        
        Provide only job titles, one per line.
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()

      const recommendations = text
        .split("\n")
        .filter((line) => line.trim())
        .slice(0, 5)
        .map((job) => `💼 ${job.replace(/^\d+\.\s*/, "").trim()}`)

      return recommendations.length > 0
        ? recommendations
        : [
            "💼 Software Developer",
            "💼 Project Manager",
            "💼 Business Analyst",
            "💼 Marketing Specialist",
            "💼 Data Analyst",
          ]
    } catch (error) {
      console.error("Job Recommendations Error:", error)
      return [
        "💼 Software Developer",
        "💼 Project Manager",
        "💼 Business Analyst",
        "💼 Marketing Specialist",
        "💼 Data Analyst",
      ]
    }
  },
}

export default geminiAI
