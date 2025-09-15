const JOOBLE_API_KEY = "6d96e8bd-7aff-45e2-9e8c-bb1df630d12a"
const JOOBLE_API_URL = "https://jooble.org/api"

export interface JoobleJob {
  title: string
  location: string
  snippet: string
  salary: string
  source: string
  type: string
  link: string
  company: string
  updated: string
  id: string
}

export interface JoobleSearchParams {
  keywords: string
  location?: string
  radius?: number
  salary?: string
  datecreatedfrom?: string
  page?: number
}

export const joobleService = {
  async searchJobs(params: JoobleSearchParams): Promise<{
    jobs: JoobleJob[]
    totalCount: number
  }> {
    try {
      const searchPayload = {
        keywords: params.keywords,
        location: params.location || "",
        radius: params.radius || 25,
        salary: params.salary || "",
        datecreatedfrom: params.datecreatedfrom || "",
        page: params.page || 1,
      }

      const response = await fetch(`${JOOBLE_API_URL}/${JOOBLE_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchPayload),
      })

      if (!response.ok) {
        throw new Error(`Jooble API error: ${response.status}`)
      }

      const data = await response.json()

      // Transform Jooble response to our format
      const jobs: JoobleJob[] = (data.jobs || []).map((job: any, index: number) => ({
        id: `jooble-${Date.now()}-${index}`,
        title: job.title || "Job Title Not Available",
        company: job.company || "Company Not Specified",
        location: job.location || params.location || "Location Not Specified",
        snippet: job.snippet || "Job description not available",
        salary: job.salary || "Salary not specified",
        source: job.source || "Jooble",
        type: job.type || "Full-time",
        link: job.link || "#",
        updated: job.updated || new Date().toISOString(),
      }))

      return {
        jobs,
        totalCount: data.totalCount || jobs.length,
      }
    } catch (error) {
      console.error("Jooble API Error:", error)

      // Return fallback sample jobs with emojis
      return {
        jobs: [
          {
            id: "sample-1",
            title: "💻 Senior Software Developer",
            company: "TechCorp Inc.",
            location: params.location || "San Francisco, CA",
            snippet:
              "🚀 Join our innovative team building next-generation applications. We're looking for experienced developers passionate about creating scalable solutions.",
            salary: "$120,000 - $150,000",
            source: "Jooble",
            type: "Full-time",
            link: "#",
            updated: new Date().toISOString(),
          },
          {
            id: "sample-2",
            title: "📊 Data Analyst",
            company: "Analytics Pro",
            location: params.location || "New York, NY",
            snippet:
              "📈 Analyze complex datasets to drive business decisions. Perfect opportunity for detail-oriented professionals with strong analytical skills.",
            salary: "$80,000 - $100,000",
            source: "Jooble",
            type: "Full-time",
            link: "#",
            updated: new Date().toISOString(),
          },
          {
            id: "sample-3",
            title: "🎨 UX/UI Designer",
            company: "Design Studio",
            location: params.location || "Austin, TX",
            snippet:
              "✨ Create beautiful, user-centered designs for web and mobile applications. Join a creative team that values innovation and user experience.",
            salary: "$70,000 - $90,000",
            source: "Jooble",
            type: "Full-time",
            link: "#",
            updated: new Date().toISOString(),
          },
          {
            id: "sample-4",
            title: "💼 Project Manager",
            company: "Business Solutions LLC",
            location: params.location || "Chicago, IL",
            snippet:
              "🎯 Lead cross-functional teams to deliver projects on time and within budget. Excellent opportunity for organized professionals with leadership skills.",
            salary: "$90,000 - $110,000",
            source: "Jooble",
            type: "Full-time",
            link: "#",
            updated: new Date().toISOString(),
          },
          {
            id: "sample-5",
            title: "🔧 DevOps Engineer",
            company: "Cloud Systems Inc.",
            location: params.location || "Seattle, WA",
            snippet:
              "☁️ Build and maintain scalable cloud infrastructure. Perfect for engineers passionate about automation and system reliability.",
            salary: "$110,000 - $140,000",
            source: "Jooble",
            type: "Full-time",
            link: "#",
            updated: new Date().toISOString(),
          },
        ],
        totalCount: 5,
      }
    }
  },

  async getJobRecommendations(userSkills: string[], location?: string): Promise<JoobleJob[]> {
    try {
      const keywords = userSkills.join(" OR ")
      const result = await this.searchJobs({
        keywords,
        location,
        page: 1,
      })

      return result.jobs.slice(0, 10) // Return top 10 recommendations
    } catch (error) {
      console.error("Job Recommendations Error:", error)
      return []
    }
  },
}

export default joobleService
