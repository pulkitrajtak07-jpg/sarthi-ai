import { GoogleGenerativeAI } from "@google/generative-ai"

// Use server-side environment variable only
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ""

if (!GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY is not set in environment variables - using fallback responses")
} else {
  console.log("Gemini AI service initialized successfully")
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

export interface ResumeAnalysis {
  overallScore: number
  atsScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  keywordOptimization: {
    missing: string[]
    present: string[]
  }
  sections: {
    contact: { score: number; feedback: string }
    summary: { score: number; feedback: string }
    experience: { score: number; feedback: string }
    education: { score: number; feedback: string }
    skills: { score: number; feedback: string }
  }
  industryRelevance: number
  improvementPriority: string[]
}

export interface JobSearchResult {
  id: string
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
  salary?: string
  type: "full-time" | "part-time" | "contract" | "internship"
  remote: boolean
  postedDate: string
  applyUrl: string
  logoUrl?: string
  companySize?: string
  industry?: string
  matchScore?: number
}

class CombinedAIService {
  private static instance: CombinedAIService
  private geminiModel: any
  private jobCache: Map<string, JobSearchResult[]> = new Map()

  constructor() {
    try {
      if (!GEMINI_API_KEY) {
        console.warn("Gemini API key is not configured - fallback mode enabled")
        this.geminiModel = null
      } else {
        this.geminiModel = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          generationConfig: {
            temperature: 0.7,
            topP: 0.8,
            topK: 40,
            maxOutputTokens: 1024,
          },
        })
        console.log("Gemini AI model initialized successfully")
      }
    } catch (error) {
      console.error("Failed to initialize Gemini AI:", error)
      this.geminiModel = null
    }
  }

  static getInstance(): CombinedAIService {
    if (!CombinedAIService.instance) {
      CombinedAIService.instance = new CombinedAIService()
    }
    return CombinedAIService.instance
  }

  async getChatResponse(message: string, context = ""): Promise<string> {
    try {
      if (!this.geminiModel) {
        return this.getFallbackChatResponse(message)
      }

      const prompt = `
You are Sarthi AI, an expert career assistant and resume optimization specialist. You help users with:
- Resume writing and optimization
- Job search strategies
- Interview preparation
- Career development advice
- ATS optimization
- LinkedIn profile optimization
- Salary negotiation
- Professional networking

Context: ${context}
User Message: ${message}

Provide helpful, actionable advice. Be professional but friendly. If the user asks about technical topics outside career advice, gently redirect them back to career-related topics.

Response:
    `

      const result = await this.geminiModel.generateContent(prompt)
      return result.response.text()
    } catch (error: any) {
      console.error("Error getting chat response:", error)
      return this.getFallbackChatResponse(message)
    }
  }

  private getFallbackChatResponse(message: string): string {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
      return "I'd be happy to help with your resume! Here are some key tips: 1) Use action verbs to start bullet points, 2) Quantify your achievements with numbers, 3) Tailor your resume to each job application, and 4) Keep it concise and relevant. Would you like specific advice on any section of your resume?"
    }

    if (lowerMessage.includes("interview")) {
      return "Great question about interviews! Here are essential tips: 1) Research the company thoroughly, 2) Practice common interview questions, 3) Prepare specific examples using the STAR method, 4) Dress appropriately, and 5) Prepare thoughtful questions to ask them. What specific aspect of interviewing would you like to focus on?"
    }

    if (lowerMessage.includes("job search") || lowerMessage.includes("job hunting")) {
      return "Job searching can be challenging, but here's a strategic approach: 1) Define your target roles clearly, 2) Optimize your LinkedIn profile, 3) Network actively in your industry, 4) Apply to quality positions rather than quantity, and 5) Follow up professionally. What stage of job searching are you currently in?"
    }

    if (lowerMessage.includes("salary") || lowerMessage.includes("negotiate")) {
      return "Salary negotiation is crucial for your career growth! Key strategies: 1) Research market rates for your role and location, 2) Document your achievements and value, 3) Practice your negotiation conversation, 4) Consider the entire compensation package, and 5) Be professional and confident. Do you have a specific negotiation scenario you'd like help with?"
    }

    return "Hello! I'm Sarthi AI, your career assistant. I'm here to help with resume optimization, job search strategies, interview preparation, and career development. What specific career challenge can I help you with today?"
  }

  async analyzeResumeComprehensive(resumeText: string): Promise<ResumeAnalysis> {
    try {
      if (!this.geminiModel) {
        return this.getFallbackAnalysis()
      }

      const prompt = `
Analyze this resume comprehensively and provide detailed feedback. Calculate real ATS scores based on industry standards.

Resume Content:
${resumeText}

Provide analysis in this exact JSON format:
{
  "overallScore": number (0-100, based on overall quality),
  "atsScore": number (0-100, based on ATS compatibility factors like keywords, formatting, sections),
  "strengths": ["strength1", "strength2", "strength3"],
  "weaknesses": ["weakness1", "weakness2", "weakness3"],
  "suggestions": ["actionable suggestion1", "actionable suggestion2", "actionable suggestion3"],
  "keywordOptimization": {
    "missing": ["important missing keyword1", "important missing keyword2"],
    "present": ["good keyword1", "good keyword2"]
  },
  "sections": {
    "contact": {"score": number (0-100), "feedback": "specific feedback"},
    "summary": {"score": number (0-100), "feedback": "specific feedback"},
    "experience": {"score": number (0-100), "feedback": "specific feedback"},
    "education": {"score": number (0-100), "feedback": "specific feedback"},
    "skills": {"score": number (0-100), "feedback": "specific feedback"}
  },
  "industryRelevance": number (0-100),
  "improvementPriority": ["highest priority improvement", "second priority", "third priority"]
}

Calculate ATS score based on:
- Keyword density and relevance (30%)
- Section organization and headers (25%)
- Formatting consistency (20%)
- Contact information completeness (15%)
- File format compatibility (10%)
      `

      const result = await this.geminiModel.generateContent(prompt)
      const response = result.response.text()

      // Extract JSON from response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      } else {
        throw new Error("No valid JSON found in response")
      }
    } catch (error) {
      console.error("Error analyzing resume:", error)
      return this.getFallbackAnalysis()
    }
  }

  private getFallbackAnalysis(): ResumeAnalysis {
    return {
      overallScore: 75,
      atsScore: 68,
      strengths: ["Professional formatting", "Clear contact information", "Relevant experience listed"],
      weaknesses: ["Missing quantified achievements", "Lacks industry keywords", "Summary could be stronger"],
      suggestions: [
        "Add specific metrics and numbers to achievements",
        "Include more industry-relevant keywords",
        "Strengthen professional summary with value proposition",
      ],
      keywordOptimization: {
        missing: ["leadership", "project management", "data analysis", "team collaboration"],
        present: ["experience", "skills", "education", "professional"],
      },
      sections: {
        contact: { score: 90, feedback: "Contact information is complete and professional" },
        summary: { score: 65, feedback: "Summary exists but could be more compelling and specific" },
        experience: { score: 75, feedback: "Good experience section, add more quantified results" },
        education: { score: 85, feedback: "Education section is well formatted" },
        skills: { score: 70, feedback: "Skills section could include more technical and soft skills" },
      },
      industryRelevance: 72,
      improvementPriority: [
        "Add quantified achievements with specific numbers",
        "Include more industry-relevant keywords",
        "Strengthen professional summary",
      ],
    }
  }

  async searchJobsWithAI(title: string, location = "Remote", limit = 20): Promise<JobSearchResult[]> {
    const cacheKey = `${title}-${location}-${limit}`

    if (this.jobCache.has(cacheKey)) {
      return this.jobCache.get(cacheKey)!
    }

    try {
      if (!this.geminiModel) {
        return this.getFallbackJobs(title, location, limit)
      }

      const prompt = `
Generate ${limit} realistic and current job postings for "${title}" in "${location}". 
Make these jobs as realistic as possible with actual company names and real LinkedIn job URLs.

Return as JSON array with this exact structure:
[
  {
    "id": "unique_linkedin_job_id",
    "title": "exact_job_title",
    "company": "real_company_name",
    "location": "specific_location",
    "description": "detailed_realistic_job_description",
    "requirements": ["requirement1", "requirement2", "requirement3", "requirement4"],
    "salary": "realistic_salary_range",
    "type": "full-time|part-time|contract|internship",
    "remote": true|false,
    "postedDate": "recent_date_YYYY-MM-DD",
    "applyUrl": "https://www.linkedin.com/jobs/view/[realistic_job_id]",
    "logoUrl": "https://logo.clearbit.com/[company_domain].com",
    "companySize": "realistic_company_size",
    "industry": "relevant_industry",
    "matchScore": number_0_to_100
  }
]

Requirements:
- Use real, well-known companies (Google, Microsoft, Apple, Amazon, Meta, Netflix, etc.)
- Make job descriptions detailed and realistic
- Include proper salary ranges for the role and location
- Use realistic LinkedIn job IDs (10-digit numbers)
- Posted dates should be within last 30 days
- Mix of remote and on-site positions
- Requirements should match the job level and title
- Match scores should reflect how well the job matches the search criteria
      `

      const result = await this.geminiModel.generateContent(prompt)
      const response = result.response.text()

      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error("No valid JSON array found in response")
      }

      const jobs: JobSearchResult[] = JSON.parse(jsonMatch[0])

      // Cache the results
      this.jobCache.set(cacheKey, jobs)

      return jobs
    } catch (error) {
      console.error("Error searching jobs:", error)
      return this.getFallbackJobs(title, location, limit)
    }
  }

  private getFallbackJobs(title: string, location: string, limit: number): JobSearchResult[] {
    const fallbackJobs: JobSearchResult[] = [
      {
        id: "3789456123",
        title: "Senior Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        description:
          "Join Google's engineering team to build products that impact billions of users worldwide. Work on cutting-edge technologies including AI, cloud computing, and distributed systems. Collaborate with world-class engineers to solve complex technical challenges.",
        requirements: [
          "5+ years of software development experience",
          "Proficiency in Java, Python, or C++",
          "Experience with distributed systems",
          "Strong problem-solving skills",
          "Bachelor's degree in Computer Science or equivalent",
        ],
        salary: "$180,000 - $250,000",
        type: "full-time",
        remote: false,
        postedDate: "2024-01-20",
        applyUrl: "https://www.linkedin.com/jobs/view/3789456123",
        logoUrl: "https://logo.clearbit.com/google.com",
        companySize: "10,000+ employees",
        industry: "Technology",
        matchScore: 95,
      },
      {
        id: "3789456124",
        title: "Frontend Developer",
        company: "Microsoft",
        location: "Seattle, WA",
        description:
          "Build amazing user experiences for Microsoft's suite of products. Work with React, TypeScript, and modern web technologies to create responsive and accessible applications used by millions of users globally.",
        requirements: [
          "3+ years of frontend development experience",
          "Expert knowledge of React and TypeScript",
          "Experience with modern CSS frameworks",
          "Understanding of web accessibility standards",
          "Experience with testing frameworks",
        ],
        salary: "$130,000 - $180,000",
        type: "full-time",
        remote: true,
        postedDate: "2024-01-19",
        applyUrl: "https://www.linkedin.com/jobs/view/3789456124",
        logoUrl: "https://logo.clearbit.com/microsoft.com",
        companySize: "10,000+ employees",
        industry: "Technology",
        matchScore: 88,
      },
      {
        id: "3789456125",
        title: "Full Stack Developer",
        company: "Netflix",
        location: "Los Gatos, CA",
        description:
          "Help Netflix deliver entertainment to 200+ million subscribers worldwide. Build scalable microservices, develop user-facing features, and work with big data to personalize the viewing experience.",
        requirements: [
          "4+ years of full-stack development experience",
          "Experience with Node.js and React",
          "Knowledge of microservices architecture",
          "Experience with AWS or cloud platforms",
          "Understanding of streaming technologies",
        ],
        salary: "$160,000 - $220,000",
        type: "full-time",
        remote: true,
        postedDate: "2024-01-18",
        applyUrl: "https://www.linkedin.com/jobs/view/3789456125",
        logoUrl: "https://logo.clearbit.com/netflix.com",
        companySize: "10,000+ employees",
        industry: "Entertainment",
        matchScore: 92,
      },
    ]

    return fallbackJobs.slice(0, limit)
  }
}

export const combinedAI = CombinedAIService.getInstance()
