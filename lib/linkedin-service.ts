// Note: LinkedIn's API has restricted access. This is a mock implementation.
// In a real application, you would need to apply for LinkedIn API access and use their official SDK.

import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface LinkedInJob {
  id: string
  title: string
  company: string
  location: string
  description: string
  requirements: string[]
  salary?: string
  postedDate: string
  applicationUrl: string
  matchScore: number
}

// Mock data for fallback when API calls fail or in preview environments
const MOCK_JOBS: LinkedInJob[] = [
  {
    id: "job1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    description:
      "We're looking for an experienced frontend developer to join our team. You'll be responsible for building user interfaces for our web applications using React and TypeScript.",
    requirements: [
      "5+ years of experience with React",
      "Strong TypeScript skills",
      "Experience with state management libraries",
      "Knowledge of modern CSS frameworks",
    ],
    salary: "$120,000 - $150,000",
    postedDate: "2 days ago",
    applicationUrl: "https://example.com/apply",
    matchScore: 92,
  },
  {
    id: "job2",
    title: "Full Stack Developer",
    company: "InnovateSoft",
    location: "New York, NY (Hybrid)",
    description:
      "Join our growing team to develop full-stack applications. You'll work on both frontend and backend technologies to deliver complete solutions.",
    requirements: [
      "Experience with React and Node.js",
      "Knowledge of database design",
      "Familiarity with cloud services",
      "Good problem-solving skills",
    ],
    salary: "$100,000 - $130,000",
    postedDate: "1 week ago",
    applicationUrl: "https://example.com/apply",
    matchScore: 85,
  },
  {
    id: "job3",
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "San Francisco, CA",
    description:
      "We're seeking a talented UI/UX designer to create beautiful and functional user interfaces for our products. You'll work closely with our development team to implement your designs.",
    requirements: [
      "Portfolio demonstrating UI/UX skills",
      "Experience with Figma or similar tools",
      "Understanding of user-centered design principles",
      "Knowledge of frontend development is a plus",
    ],
    salary: "$90,000 - $120,000",
    postedDate: "3 days ago",
    applicationUrl: "https://example.com/apply",
    matchScore: 78,
  },
  {
    id: "job4",
    title: "Backend Engineer",
    company: "DataSystems",
    location: "Remote",
    description:
      "Build and maintain scalable backend services for our data processing platform. You'll work with large datasets and implement efficient algorithms.",
    requirements: [
      "Strong experience with Node.js or Python",
      "Knowledge of database systems",
      "Experience with API design",
      "Understanding of cloud infrastructure",
    ],
    salary: "$110,000 - $140,000",
    postedDate: "5 days ago",
    applicationUrl: "https://example.com/apply",
    matchScore: 88,
  },
  {
    id: "job5",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Chicago, IL (Remote option)",
    description:
      "Help us build and maintain our cloud infrastructure. You'll be responsible for deployment pipelines, monitoring, and ensuring system reliability.",
    requirements: [
      "Experience with AWS or Azure",
      "Knowledge of containerization technologies",
      "Familiarity with CI/CD pipelines",
      "Infrastructure as Code experience",
    ],
    salary: "$115,000 - $145,000",
    postedDate: "1 week ago",
    applicationUrl: "https://example.com/apply",
    matchScore: 82,
  },
]

// Check if we're in a preview environment
const isPreviewEnvironment = () => {
  return (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "preview" ||
    (typeof window !== "undefined" && window.location.hostname === "localhost")
  )
}

export async function searchJobs(query: string, location: string, limit = 10): Promise<LinkedInJob[]> {
  // In a real implementation, this would call the LinkedIn API
  // For now, we'll generate mock data using AI or return fallback data

  // If in preview or API key is missing, return mock data
  if (isPreviewEnvironment() || !process.env.OPENAI_API_KEY) {
    console.log("Using mock job data for search")
    return MOCK_JOBS.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.location.toLowerCase().includes(location.toLowerCase()),
    ).slice(0, limit)
  }

  try {
    const prompt = `
      Generate ${limit} realistic job listings that would appear on LinkedIn for the search query "${query}" in "${location}".
      Format the response as a JSON array with objects containing these fields:
      - id (string): A unique identifier
      - title (string): Job title
      - company (string): Company name
      - location (string): Job location (city, state, remote, etc.)
      - description (string): Brief job description (2-3 sentences)
      - requirements (array): 3-5 key requirements as strings
      - salary (string, optional): Salary range if available
      - postedDate (string): When the job was posted (e.g., "2 days ago")
      - applicationUrl (string): A fake application URL
      - matchScore (number): A match score between 60-95
      
      Make the jobs varied and realistic for the given query.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating job listings:", error)
    // Return mock data as fallback
    return MOCK_JOBS.slice(0, limit)
  }
}

export async function getJobRecommendations(resumeData: any, limit = 10): Promise<LinkedInJob[]> {
  // In a real implementation, this would analyze the resume and call the LinkedIn API
  // For now, we'll generate mock recommendations using AI or return fallback data

  // If in preview or API key is missing, return mock data
  if (isPreviewEnvironment() || !process.env.OPENAI_API_KEY) {
    console.log("Using mock job data for recommendations")
    return MOCK_JOBS.slice(0, limit)
  }

  try {
    const skills = resumeData.skills.join(", ")
    const experience = resumeData.experience.map((exp) => `${exp.title} at ${exp.company}`).join(", ")

    const prompt = `
      Based on a resume with the following details:
      - Skills: ${skills || "Not specified"}
      - Experience: ${experience || "Not specified"}
      - Education: ${resumeData.education[0]?.degree || "Not specified"} from ${resumeData.education[0]?.institution || "Not specified"}
      
      Generate ${limit} realistic job recommendations that would be a good match for this candidate.
      Format the response as a JSON array with objects containing these fields:
      - id (string): A unique identifier
      - title (string): Job title
      - company (string): Company name
      - location (string): Job location (city, state, remote, etc.)
      - description (string): Brief job description (2-3 sentences)
      - requirements (array): 3-5 key requirements as strings
      - salary (string, optional): Salary range if available
      - postedDate (string): When the job was posted (e.g., "2 days ago")
      - applicationUrl (string): A fake application URL
      - matchScore (number): A match score between 60-95 based on how well the job matches the resume
      
      Make the jobs varied and realistic for the given resume profile.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: prompt,
    })

    return JSON.parse(text)
  } catch (error) {
    console.error("Error generating job recommendations:", error)
    // Return mock data as fallback
    return MOCK_JOBS.slice(0, limit)
  }
}
