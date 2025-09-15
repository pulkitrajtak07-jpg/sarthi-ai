import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export interface JobPosting {
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
}

export class LinkedInJobService {
  private static instance: LinkedInJobService
  private jobCache: Map<string, JobPosting[]> = new Map()

  static getInstance(): LinkedInJobService {
    if (!LinkedInJobService.instance) {
      LinkedInJobService.instance = new LinkedInJobService()
    }
    return LinkedInJobService.instance
  }

  async searchJobs(query: string, location = "Remote", limit = 20): Promise<JobPosting[]> {
    const cacheKey = `${query}-${location}-${limit}`

    if (this.jobCache.has(cacheKey)) {
      return this.jobCache.get(cacheKey)!
    }

    try {
      // Generate realistic job postings using Gemini AI
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const prompt = `
      Generate ${limit} realistic job postings for "${query}" in "${location}". 
      Return as JSON array with this exact structure:
      [
        {
          "id": "unique_id",
          "title": "job_title",
          "company": "company_name",
          "location": "location",
          "description": "detailed_job_description",
          "requirements": ["requirement1", "requirement2", "requirement3"],
          "salary": "salary_range",
          "type": "full-time|part-time|contract|internship",
          "remote": true|false,
          "postedDate": "YYYY-MM-DD",
          "applyUrl": "https://linkedin.com/jobs/view/[random_number]",
          "logoUrl": "https://logo.clearbit.com/[company_domain].com",
          "companySize": "company_size",
          "industry": "industry_name"
        }
      ]
      
      Make sure:
      - Job titles are relevant to "${query}"
      - Companies are real, well-known companies
      - Descriptions are detailed and realistic
      - Requirements match the job level
      - Apply URLs follow LinkedIn format
      - Posted dates are recent (within last 30 days)
      - Mix of remote and on-site positions
      `

      const result = await model.generateContent(prompt)
      const response = result.response.text()

      // Extract JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response")
      }

      const jobs: JobPosting[] = JSON.parse(jsonMatch[0])

      // Cache the results
      this.jobCache.set(cacheKey, jobs)

      return jobs
    } catch (error) {
      console.error("Error fetching jobs:", error)

      // Return fallback jobs if API fails
      return this.getFallbackJobs(query, location, limit)
    }
  }

  async getJobRecommendations(resumeText: string, preferences: any = {}): Promise<JobPosting[]> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const prompt = `
      Based on this resume, recommend relevant job titles and generate job postings:
      
      Resume: ${resumeText.substring(0, 2000)}
      
      Preferences: ${JSON.stringify(preferences)}
      
      Generate 10 job recommendations as JSON array with realistic job postings that match the candidate's skills and experience.
      Use the same JSON structure as before.
      `

      const result = await model.generateContent(prompt)
      const response = result.response.text()

      const jsonMatch = response.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response")
      }

      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error("Error getting job recommendations:", error)
      return this.getFallbackJobs("software engineer", "Remote", 10)
    }
  }

  private getFallbackJobs(query: string, location: string, limit: number): JobPosting[] {
    const fallbackJobs: JobPosting[] = [
      {
        id: "1",
        title: "Senior Software Engineer",
        company: "Google",
        location: "Mountain View, CA",
        description:
          "Join our team to build next-generation software solutions. Work with cutting-edge technologies and collaborate with world-class engineers.",
        requirements: ["5+ years experience", "JavaScript/TypeScript", "React", "Node.js", "Cloud platforms"],
        salary: "$150,000 - $200,000",
        type: "full-time",
        remote: true,
        postedDate: "2024-01-15",
        applyUrl: "https://linkedin.com/jobs/view/3789456123",
        logoUrl: "https://logo.clearbit.com/google.com",
        companySize: "10,000+ employees",
        industry: "Technology",
      },
      {
        id: "2",
        title: "Frontend Developer",
        company: "Microsoft",
        location: "Seattle, WA",
        description:
          "Build amazing user experiences for millions of users worldwide. Work with React, TypeScript, and modern web technologies.",
        requirements: ["3+ years experience", "React", "TypeScript", "CSS", "Git"],
        salary: "$120,000 - $160,000",
        type: "full-time",
        remote: false,
        postedDate: "2024-01-14",
        applyUrl: "https://linkedin.com/jobs/view/3789456124",
        logoUrl: "https://logo.clearbit.com/microsoft.com",
        companySize: "10,000+ employees",
        industry: "Technology",
      },
      {
        id: "3",
        title: "Full Stack Developer",
        company: "Netflix",
        location: "Los Gatos, CA",
        description:
          "Help us deliver entertainment to millions of users globally. Work on scalable systems and innovative features.",
        requirements: ["4+ years experience", "Python", "React", "AWS", "Microservices"],
        salary: "$140,000 - $180,000",
        type: "full-time",
        remote: true,
        postedDate: "2024-01-13",
        applyUrl: "https://linkedin.com/jobs/view/3789456125",
        logoUrl: "https://logo.clearbit.com/netflix.com",
        companySize: "10,000+ employees",
        industry: "Entertainment",
      },
    ]

    return fallbackJobs.slice(0, limit)
  }

  async getJobDetails(jobId: string): Promise<JobPosting | null> {
    // In a real implementation, this would fetch from LinkedIn API
    // For now, return a detailed job posting
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

      const prompt = `
      Generate a detailed job posting for job ID: ${jobId}
      Return as JSON with the complete job posting structure including all details.
      `

      const result = await model.generateContent(prompt)
      const response = result.response.text()

      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        return null
      }

      return JSON.parse(jsonMatch[0])
    } catch (error) {
      console.error("Error fetching job details:", error)
      return null
    }
  }
}

export const linkedInJobService = LinkedInJobService.getInstance()
