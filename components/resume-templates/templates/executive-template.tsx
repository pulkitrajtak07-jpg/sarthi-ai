import type { ResumeData } from "@/types/resume"

interface ExecutiveTemplateProps {
  data: ResumeData
}

export default function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  return (
    <div className="bg-white shadow-lg max-w-4xl mx-auto font-serif">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold mb-2">{data.personalInfo?.fullName || "Executive Name"}</h1>
            <p className="text-blue-200 text-lg font-medium">{data.personalInfo?.title || "Chief Executive Officer"}</p>
          </div>
          <div className="text-right text-blue-200 space-y-1">
            <p>{data.personalInfo?.email || "executive@company.com"}</p>
            <p>{data.personalInfo?.phone || "+1 (555) 123-4567"}</p>
            <p>{data.personalInfo?.location || "New York, NY"}</p>
            {data.personalInfo?.linkedin && <p className="text-yellow-300">{data.personalInfo.linkedin}</p>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Executive Summary */}
        {data.summary && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-yellow-500">
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
          </div>
        )}

        {/* Professional Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-yellow-500">
              Professional Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-0 top-2 w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                      <p className="text-blue-700 font-semibold text-lg">{exp.company}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b border-yellow-500">Education</h2>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-700 font-medium">{edu.school}</p>
                    <span className="text-gray-600 text-sm">{edu.year}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Core Competencies */}
          {data.skills && data.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-blue-900 mb-4 pb-2 border-b border-yellow-500">
                Core Competencies
              </h2>
              <div className="grid grid-cols-1 gap-2">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center p-2 bg-blue-50 rounded">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-gray-800 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Key Projects & Achievements */}
        {data.projects && data.projects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 pb-2 border-b-2 border-yellow-500">
              Key Projects & Achievements
            </h2>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-lg border-l-4 border-yellow-500"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
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

      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center">
        <p className="text-gray-600 text-sm">Confidential Resume - {data.personalInfo?.fullName || "Executive Name"}</p>
      </div>
    </div>
  )
}
