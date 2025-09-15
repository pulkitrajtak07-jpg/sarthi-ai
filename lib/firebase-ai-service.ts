import { model } from "@/lib/firebase"

export class FirebaseAIService {
  static async generateText(prompt: string): Promise<string> {
    try {
      const result = await model.generateContent(prompt)
      const response = await result.response
      return response.text()
    } catch (error) {
      console.error("Firebase AI Error:", error)
      throw new Error("Failed to generate AI response")
    }
  }

  static async analyzeResume(resumeText: string): Promise<any> {
    const prompt = `
      Analyze this resume and provide detailed feedback:
      
      Resume Content:
      ${resumeText}
      
      Please provide:
      1. Overall score (0-100)
      2. Strengths (list 3-5 key strengths)
      3. Areas for improvement (list 3-5 areas)
      4. ATS optimization suggestions
      5. Keyword recommendations
      6. Format and structure feedback
      7. Content quality assessment
      
      Format your response as JSON with the following structure:
      {
        "score": number,
        "strengths": ["strength1", "strength2", ...],
        "improvements": ["improvement1", "improvement2", ...],
        "atsOptimization": ["suggestion1", "suggestion2", ...],
        "keywords": ["keyword1", "keyword2", ...],
        "formatFeedback": "detailed feedback about format",
        "contentFeedback": "detailed feedback about content"
      }
    `

    try {
      const response = await this.generateText(prompt)
      return JSON.parse(response)
    } catch (error) {
      console.error("Resume analysis error:", error)
      throw new Error("Failed to analyze resume")
    }
  }

  static async generateResumeContent(jobTitle: string, experience: string, skills: string[]): Promise<any> {
    const prompt = `
      Generate professional resume content for:
      Job Title: ${jobTitle}
      Experience Level: ${experience}
      Skills: ${skills.join(", ")}
      
      Please generate:
      1. Professional summary (2-3 sentences)
      2. Key achievements (3-5 bullet points)
      3. Relevant skills to highlight
      4. Suggested job responsibilities
      
      Format as JSON:
      {
        "summary": "professional summary text",
        "achievements": ["achievement1", "achievement2", ...],
        "skillsToHighlight": ["skill1", "skill2", ...],
        "responsibilities": ["responsibility1", "responsibility2", ...]
      }
    `

    try {
      const response = await this.generateText(prompt)
      return JSON.parse(response)
    } catch (error) {
      console.error("Resume generation error:", error)
      throw new Error("Failed to generate resume content")
    }
  }

  static async getChatResponse(message: string, context?: string): Promise<string> {
    const prompt = `
      You are a professional resume and career advisor AI assistant. 
      ${context ? `Context: ${context}` : ""}
      
      User message: ${message}
      
      Provide helpful, specific, and actionable advice about:
      - Resume writing and optimization
      - Job search strategies
      - Interview preparation
      - Career development
      - Professional networking
      - Skill development
      
      Keep your response conversational, helpful, and under 200 words.
    `

    try {
      return await this.generateText(prompt)
    } catch (error) {
      console.error("Chat response error:", error)
      return "I'm sorry, I'm having trouble processing your request right now. Please try again later."
    }
  }

  static async generateJobRecommendations(userProfile: any): Promise<any> {
    const prompt = `
      Based on this user profile, recommend suitable job opportunities:
      
      Profile:
      - Skills: ${userProfile.skills?.join(", ") || "Not specified"}
      - Experience: ${userProfile.experience || "Not specified"}
      - Industry: ${userProfile.industry || "Not specified"}
      - Location: ${userProfile.location || "Not specified"}
      
      Generate 5-10 job recommendations with:
      1. Job title
      2. Company type
      3. Required skills match
      4. Salary range estimate
      5. Why it's a good fit
      
      Format as JSON array:
      [
        {
          "title": "job title",
          "companyType": "company type",
          "skillsMatch": ["skill1", "skill2"],
          "salaryRange": "salary range",
          "whyGoodFit": "explanation"
        }
      ]
    `

    try {
      const response = await this.generateText(prompt)
      return JSON.parse(response)
    } catch (error) {
      console.error("Job recommendations error:", error)
      throw new Error("Failed to generate job recommendations")
    }
  }
}
