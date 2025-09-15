import type { ResumeData } from "@/types/resume"

interface MinimalistTemplateProps {
  data: ResumeData
}

export default function MinimalistTemplate({ data }: MinimalistTemplateProps) {
  return (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto font-sans">
      {/* Header */}
      <div className="text-center mb-8 pb-6 border-b border-gray-200">
        <h1 className="text-4xl font-light text-gray-800 mb-2">{data.personalInfo?.fullName || "Your Name"}</h1>
        <div className="text-gray-600 space-y-1">
          <p>{data.personalInfo?.email || "your.email@example.com"}</p>
          <p>{data.personalInfo?.phone || "+1 (555) 123-4567"}</p>
          <p>{data.personalInfo?.location || "City, State"}</p>
          {data.personalInfo?.linkedin && <p className="text-green-600">{data.personalInfo.linkedin}</p>}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-800 mb-3 pb-1 border-b border-green-200">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-800 mb-4 pb-1 border-b border-green-200">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{exp.position}</h3>
                    <p className="text-green-600 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{exp.duration}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-800 mb-4 pb-1 border-b border-green-200">Education</h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{edu.degree}</h3>
                  <p className="text-green-600">{edu.school}</p>
                </div>
                <span className="text-gray-500 text-sm">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-800 mb-4 pb-1 border-b border-green-200">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-light text-gray-800 mb-4 pb-1 border-b border-green-200">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="text-lg font-medium text-gray-800 mb-1">{project.name}</h3>
                <p className="text-gray-700 leading-relaxed">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
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
  )
}
