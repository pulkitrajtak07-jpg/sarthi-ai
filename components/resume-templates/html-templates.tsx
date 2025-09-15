import type React from "react"

// Base template interface
interface TemplateProps {
  data: {
    personalInfo: {
      fullName: string
      email: string
      phone: string
      location: string
      website?: string
      linkedin?: string
      github?: string
      summary?: string
      title?: string
    }
    experience: Array<{
      company: string
      position: string
      startDate: string
      endDate: string
      description: string
      highlights?: string[]
    }>
    education: Array<{
      institution: string
      degree: string
      field?: string
      startDate: string
      endDate: string
      gpa?: string
      description?: string
    }>
    skills: {
      technical?: string[]
      soft?: string[]
      languages?: string[]
    }
    projects?: Array<{
      name: string
      description: string
      technologies?: string[]
      link?: string
      startDate?: string
      endDate?: string
    }>
    certifications?: Array<{
      name: string
      issuer: string
      date: string
      link?: string
    }>
    awards?: Array<{
      title: string
      issuer?: string
      date: string
      description?: string
    }>
  }
  color?: string
}

// Neon Cyber Template
export const NeonCyberTemplate: React.FC<TemplateProps> = ({ data, color = "blue" }) => {
  const neonColor =
    color === "blue"
      ? "neon-text-blue"
      : color === "purple"
        ? "neon-text-purple"
        : color === "pink"
          ? "neon-text-pink"
          : color === "cyan"
            ? "neon-text-cyan"
            : "neon-text-blue"

  const borderColor =
    color === "blue"
      ? "neon-border-blue"
      : color === "purple"
        ? "neon-border-purple"
        : color === "pink"
          ? "neon-border-pink"
          : color === "cyan"
            ? "neon-border-cyan"
            : "neon-border-blue"

  return (
    <div className="resume-template-dark cyber-grid p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${neonColor}`}>{data.personalInfo.fullName}</h1>
        <h2 className="text-xl text-gray-300 mb-4">{data.personalInfo.title || "Professional"}</h2>

        <div className={`p-4 ${borderColor} rounded-md bg-gray-900/50`}>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              {data.personalInfo.phone}
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              {data.personalInfo.email}
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              {data.personalInfo.location}
            </div>
            {data.personalInfo.linkedin && (
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </div>
                {data.personalInfo.linkedin}
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </div>
                {data.personalInfo.github}
              </div>
            )}
          </div>
        </div>
      </header>

      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${neonColor}`}>Professional Summary</h2>
          <div className={`p-4 ${borderColor} rounded-md bg-gray-900/50`}>
            <p>{data.personalInfo.summary}</p>
          </div>
        </section>
      )}

      <section className="mb-8">
        <h2 className={`text-xl font-bold mb-4 ${neonColor}`}>Experience</h2>
        <div className="space-y-4">
          {data.experience.map((job, index) => (
            <div key={index} className={`p-4 ${borderColor} rounded-md bg-gray-900/50`}>
              <div className="flex flex-col md:flex-row md:justify-between mb-2">
                <h3 className="font-bold">{job.position}</h3>
                <span className="text-gray-400">
                  {job.startDate} - {job.endDate}
                </span>
              </div>
              <div className="text-gray-300 mb-2">{job.company}</div>
              <p className="text-gray-400">{job.description}</p>
              {job.highlights && job.highlights.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-gray-400">
                  {job.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className={`text-xl font-bold mb-4 ${neonColor}`}>Education</h2>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className={`p-4 ${borderColor} rounded-md bg-gray-900/50`}>
              <div className="flex flex-col md:flex-row md:justify-between mb-2">
                <h3 className="font-bold">
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ""}
                </h3>
                <span className="text-gray-400">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className="text-gray-300 mb-2">{edu.institution}</div>
              {edu.gpa && <div className="text-gray-400">GPA: {edu.gpa}</div>}
              {edu.description && <p className="text-gray-400 mt-2">{edu.description}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className={`text-xl font-bold mb-4 ${neonColor}`}>Skills</h2>
        <div className={`p-4 ${borderColor} rounded-md bg-gray-900/50`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.skills.technical && data.skills.technical.length > 0 && (
              <div>
                <h3 className="font-bold mb-2">Technical</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.technical.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft && data.skills.soft.length > 0 && (
              <div>
                <h3 className="font-bold mb-2">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.soft.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.languages && data.skills.languages.length > 0 && (
              <div>
                <h3 className="font-bold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.languages.map((language, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 rounded-md text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${neonColor}`}>Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className={`p-4 ${borderColor} rounded-md bg-gray-900/50`}>
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h3 className="font-bold">{project.name}</h3>
                  {project.startDate && (
                    <span className="text-gray-400">
                      {project.startDate}
                      {project.endDate ? ` - ${project.endDate}` : ""}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mb-2">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-800 rounded-md text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm ${neonColor} mt-2 inline-block`}
                  >
                    View Project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${neonColor}`}>Certifications</h2>
          <div className="space-y-4">
            {data.certifications.map((cert, index) => (
              <div key={index} className={`p-4 ${borderColor} rounded-md bg-gray-900/50`}>
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h3 className="font-bold">{cert.name}</h3>
                  <span className="text-gray-400">{cert.date}</span>
                </div>
                <div className="text-gray-300">{cert.issuer}</div>
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm ${neonColor} mt-2 inline-block`}
                  >
                    View Certificate →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.awards && data.awards.length > 0 && (
        <section>
          <h2 className={`text-xl font-bold mb-4 ${neonColor}`}>Awards & Achievements</h2>
          <div className="space-y-4">
            {data.awards.map((award, index) => (
              <div key={index} className={`p-4 ${borderColor} rounded-md bg-gray-900/50`}>
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h3 className="font-bold">{award.title}</h3>
                  <span className="text-gray-400">{award.date}</span>
                </div>
                {award.issuer && <div className="text-gray-300 mb-2">{award.issuer}</div>}
                {award.description && <p className="text-gray-400">{award.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Minimal Dark Template
export const MinimalDarkTemplate: React.FC<TemplateProps> = ({ data, color = "blue" }) => {
  const accentColor =
    color === "blue"
      ? "text-blue-400"
      : color === "purple"
        ? "text-purple-400"
        : color === "pink"
          ? "text-pink-400"
          : color === "cyan"
            ? "text-cyan-400"
            : "text-blue-400"

  const borderColor =
    color === "blue"
      ? "border-blue-400"
      : color === "purple"
        ? "border-purple-400"
        : color === "pink"
          ? "border-pink-400"
          : color === "cyan"
            ? "border-cyan-400"
            : "border-blue-400"

  return (
    <div className="resume-template-dark p-8 max-w-4xl mx-auto">
      <header className="mb-8 pb-4 border-b border-gray-700">
        <h1 className={`text-3xl font-bold mb-2 ${accentColor}`}>{data.personalInfo.fullName}</h1>
        <h2 className="text-xl text-gray-300 mb-4">{data.personalInfo.title || "Professional"}</h2>

        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            {data.personalInfo.phone}
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            {data.personalInfo.email}
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            {data.personalInfo.location}
          </div>
          {data.personalInfo.linkedin && (
            <div className="flex items-center">
              <div className="w-4 h-4 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              {data.personalInfo.linkedin}
            </div>
          )}
        </div>
      </header>

      {data.personalInfo.summary && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${accentColor}`}>Professional Summary</h2>
          <p className="text-gray-300">{data.personalInfo.summary}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className={`text-xl font-bold mb-4 ${accentColor}`}>Experience</h2>
        <div className="space-y-6">
          {data.experience.map((job, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row md:justify-between mb-2">
                <h3 className="font-bold text-white">{job.position}</h3>
                <span className="text-gray-400">
                  {job.startDate} - {job.endDate}
                </span>
              </div>
              <div className={`text-gray-300 mb-2 ${accentColor}`}>{job.company}</div>
              <p className="text-gray-400">{job.description}</p>
              {job.highlights && job.highlights.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-gray-400">
                  {job.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className={`text-xl font-bold mb-4 ${accentColor}`}>Education</h2>
        <div className="space-y-6">
          {data.education.map((edu, index) => (
            <div key={index}>
              <div className="flex flex-col md:flex-row md:justify-between mb-2">
                <h3 className="font-bold text-white">
                  {edu.degree}
                  {edu.field ? ` in ${edu.field}` : ""}
                </h3>
                <span className="text-gray-400">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div className={`text-gray-300 mb-2 ${accentColor}`}>{edu.institution}</div>
              {edu.gpa && <div className="text-gray-400">GPA: {edu.gpa}</div>}
              {edu.description && <p className="text-gray-400 mt-2">{edu.description}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className={`text-xl font-bold mb-4 ${accentColor}`}>Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.skills.technical && data.skills.technical.length > 0 && (
            <div>
              <h3 className="font-bold mb-2 text-white">Technical</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.technical.map((skill, index) => (
                  <span key={index} className={`px-2 py-1 border ${borderColor} rounded-md text-sm`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.skills.soft && data.skills.soft.length > 0 && (
            <div>
              <h3 className="font-bold mb-2 text-white">Soft Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.soft.map((skill, index) => (
                  <span key={index} className={`px-2 py-1 border ${borderColor} rounded-md text-sm`}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {data.projects && data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-xl font-bold mb-4 ${accentColor}`}>Projects</h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index}>
                <div className="flex flex-col md:flex-row md:justify-between mb-2">
                  <h3 className="font-bold text-white">{project.name}</h3>
                  {project.startDate && (
                    <span className="text-gray-400">
                      {project.startDate}
                      {project.endDate ? ` - ${project.endDate}` : ""}
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mb-2">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className={`px-2 py-1 border ${borderColor} rounded-md text-xs`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// Create more templates here...
export const FuturisticTemplate: React.FC<TemplateProps> = ({ data, color = "cyan" }) => {
  const accentColor =
    color === "blue"
      ? "text-blue-400"
      : color === "purple"
        ? "text-purple-400"
        : color === "pink"
          ? "text-pink-400"
          : color === "cyan"
            ? "text-cyan-400"
            : "text-cyan-400"

  const bgColor =
    color === "blue"
      ? "bg-blue-900/20"
      : color === "purple"
        ? "bg-purple-900/20"
        : color === "pink"
          ? "bg-pink-900/20"
          : color === "cyan"
            ? "bg-cyan-900/20"
            : "bg-cyan-900/20"

  return (
    <div className="resume-template-dark cyber-bg p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className={`p-4 rounded-lg ${bgColor} backdrop-blur-sm`}>
            <div className="flex flex-col items-center mb-4">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-cyan-400 glow">
                <div className="html-image-placeholder w-full h-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-cyan-300">
                    {data.personalInfo.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-center neon-text-cyan">{data.personalInfo.fullName}</h1>
              <h2 className="text-lg text-gray-300 text-center">{data.personalInfo.title || "Professional"}</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <div className="w-5 h-5 mr-2 text-cyan-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <span>{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 mr-2 text-cyan-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <span>{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center">
                <div className="w-5 h-5 mr-2 text-cyan-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span>{data.personalInfo.location}</span>
              </div>
              {data.personalInfo.linkedin && (
                <div className="flex items-center">
                  <div className="w-5 h-5 mr-2 text-cyan-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </div>
                  <span>{data.personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          <div className={`p-4 rounded-lg ${bgColor} backdrop-blur-sm`}>
            <h2 className="text-xl font-bold mb-4 neon-text-cyan">Skills</h2>
            {data.skills.technical && data.skills.technical.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold mb-2 text-cyan-300">Technical</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.technical.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.soft && data.skills.soft.length > 0 && (
              <div className="mb-4">
                <h3 className="font-bold mb-2 text-cyan-300">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.soft.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-md text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {data.skills.languages && data.skills.languages.length > 0 && (
              <div>
                <h3 className="font-bold mb-2 text-cyan-300">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {data.skills.languages.map((language, index) => (
                    <span key={index} className="px-2 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-md text-sm">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {data.certifications && data.certifications.length > 0 && (
            <div className={`p-4 rounded-lg ${bgColor} backdrop-blur-sm`}>
              <h2 className="text-xl font-bold mb-4 neon-text-cyan">Certifications</h2>
              <div className="space-y-3">
                {data.certifications.map((cert, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-white">{cert.name}</h3>
                    <div className="text-gray-300 text-sm">{cert.issuer}</div>
                    <div className="text-gray-400 text-sm">{cert.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2 space-y-6">
          {data.personalInfo.summary && (
            <div className={`p-4 rounded-lg ${bgColor} backdrop-blur-sm`}>
              <h2 className="text-xl font-bold mb-4 neon-text-cyan">Professional Summary</h2>
              <p className="text-gray-300">{data.personalInfo.summary}</p>
            </div>
          )}

          <div className={`p-4 rounded-lg ${bgColor} backdrop-blur-sm`}>
            <h2 className="text-xl font-bold mb-4 neon-text-cyan">Experience</h2>
            <div className="space-y-6">
              {data.experience.map((job, index) => (
                <div key={index} className="relative pl-6 border-l border-cyan-500/50">
                  <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-[7px] top-1"></div>
                  <div className="flex flex-col md:flex-row md:justify-between mb-2">
                    <h3 className="font-bold text-white">{job.position}</h3>
                    <span className="text-cyan-300">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <div className="text-gray-300 mb-2">{job.company}</div>
                  <p className="text-gray-400">{job.description}</p>
                  {job.highlights && job.highlights.length > 0 && (
                    <ul className="list-disc list-inside mt-2 text-gray-400">
                      {job.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`p-4 rounded-lg ${bgColor} backdrop-blur-sm`}>
            <h2 className="text-xl font-bold mb-4 neon-text-cyan">Education</h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l border-cyan-500/50">
                  <div className="absolute w-3 h-3 bg-cyan-400 rounded-full -left-[7px] top-1"></div>
                  <div className="flex flex-col md:flex-row md:justify-between mb-2">
                    <h3 className="font-bold text-white">
                      {edu.degree}
                      {edu.field ? ` in ${edu.field}` : ""}
                    </h3>
                    <span className="text-cyan-300">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  <div className="text-gray-300 mb-2">{edu.institution}</div>
                  {edu.gpa && <div className="text-gray-400">GPA: {edu.gpa}</div>}
                  {edu.description && <p className="text-gray-400 mt-2">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>

          {data.projects && data.projects.length > 0 && (
            <div className={`p-4 rounded-lg ${bgColor} backdrop-blur-sm`}>
              <h2 className="text-xl font-bold mb-4 neon-text-cyan">Projects</h2>
              <div className="space-y-6">
                {data.projects.map((project, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row md:justify-between mb-2">
                      <h3 className="font-bold text-white">{project.name}</h3>
                      {project.startDate && (
                        <span className="text-cyan-300">
                          {project.startDate}
                          {project.endDate ? ` - ${project.endDate}` : ""}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 mb-2">{project.description}</p>
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-cyan-900/30 border border-cyan-500/30 rounded-md text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Export all templates
export const templates = {
  NeonCyberTemplate,
  MinimalDarkTemplate,
  FuturisticTemplate,
  // Add more templates here
}
