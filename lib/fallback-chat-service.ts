export class FallbackChatService {
  private responses = {
    greeting: [
      "Hello! I'm Sarthi AI, your career assistant. How can I help you with your resume or job search today?",
      "Hi there! I'm here to help you with career advice, resume optimization, and job search strategies. What would you like to know?",
      "Welcome! I specialize in helping with resumes, career development, and job searching. How can I assist you?",
    ],
    resume: [
      "For resume optimization, focus on: 1) Using action verbs and quantified achievements, 2) Including relevant keywords for ATS systems, 3) Keeping it concise (1-2 pages), 4) Tailoring it to each job application. Would you like specific advice on any section?",
      "A great resume should highlight your achievements with specific numbers and results. Make sure to include relevant keywords from job descriptions and use a clean, ATS-friendly format. What specific area of your resume would you like to improve?",
      "Resume best practices include: quantifying your achievements, using industry keywords, maintaining consistent formatting, and tailoring content to job requirements. Upload your resume for a detailed analysis!",
    ],
    jobSearch: [
      "Effective job search strategies include: 1) Networking (70% of jobs are never posted), 2) Optimizing your LinkedIn profile, 3) Tailoring applications to each role, 4) Following up professionally. What aspect of job searching would you like help with?",
      "For job searching, I recommend: using multiple job boards, networking actively, customizing your resume for each application, and preparing thoroughly for interviews. Are you looking for jobs in a specific field?",
      "Job search success comes from being strategic: research companies thoroughly, network within your industry, optimize your online presence, and apply to roles that truly match your skills. What's your target role?",
    ],
    interview: [
      "Interview preparation tips: 1) Research the company and role thoroughly, 2) Prepare STAR method examples for behavioral questions, 3) Practice common questions, 4) Prepare thoughtful questions to ask them. What type of interview are you preparing for?",
      "For interviews, focus on: telling compelling stories about your achievements, demonstrating cultural fit, asking insightful questions, and following up professionally. Are you preparing for a specific type of interview?",
      "Interview success requires preparation: know your resume inside out, research the company's recent news and culture, practice your elevator pitch, and prepare examples that showcase your problem-solving skills.",
    ],
    skills: [
      "To develop in-demand skills: 1) Identify gaps in your target role requirements, 2) Take online courses (Coursera, LinkedIn Learning), 3) Work on projects to build your portfolio, 4) Seek mentorship. What skills are you looking to develop?",
      "Skill development strategies include: continuous learning through online platforms, hands-on projects, networking with professionals in your field, and staying updated with industry trends. What's your career focus area?",
      "Building relevant skills requires: identifying market demands, choosing quality learning resources, practicing through real projects, and showcasing your progress. Which skills are most important for your career goals?",
    ],
    salary: [
      "For salary negotiation: 1) Research market rates using Glassdoor, PayScale, 2) Document your achievements and value, 3) Practice your pitch, 4) Consider the total compensation package. Are you preparing for a specific negotiation?",
      "Salary negotiation tips: know your worth through market research, highlight your unique value proposition, be prepared to discuss the entire compensation package, and maintain professionalism throughout. What's your situation?",
      "Successful salary negotiation involves: thorough preparation with market data, clear communication of your value, flexibility on non-salary benefits, and professional follow-up. How can I help with your specific situation?",
    ],
    default: [
      "I'm here to help with career-related questions including resume optimization, job search strategies, interview preparation, and professional development. What specific career challenge can I assist you with?",
      "As your career assistant, I can help with resumes, job searching, interviews, skill development, and career planning. What would you like to focus on today?",
      "I specialize in career guidance and can assist with resume writing, job search tactics, interview prep, and professional growth. How can I support your career goals?",
    ],
  }

  getChatResponse(message: string): string {
    const lowerMessage = message.toLowerCase()

    if (this.containsKeywords(lowerMessage, ["hello", "hi", "hey", "greetings"])) {
      return this.getRandomResponse("greeting")
    }

    if (this.containsKeywords(lowerMessage, ["resume", "cv", "curriculum"])) {
      return this.getRandomResponse("resume")
    }

    if (this.containsKeywords(lowerMessage, ["job", "career", "work", "employment", "position"])) {
      return this.getRandomResponse("jobSearch")
    }

    if (this.containsKeywords(lowerMessage, ["interview", "meeting", "questions"])) {
      return this.getRandomResponse("interview")
    }

    if (this.containsKeywords(lowerMessage, ["skill", "learn", "develop", "training", "course"])) {
      return this.getRandomResponse("skills")
    }

    if (this.containsKeywords(lowerMessage, ["salary", "pay", "compensation", "negotiate", "money"])) {
      return this.getRandomResponse("salary")
    }

    return this.getRandomResponse("default")
  }

  private containsKeywords(message: string, keywords: string[]): boolean {
    return keywords.some((keyword) => message.includes(keyword))
  }

  private getRandomResponse(category: keyof typeof this.responses): string {
    const responses = this.responses[category]
    return responses[Math.floor(Math.random() * responses.length)]
  }
}

export const fallbackChat = new FallbackChatService()
