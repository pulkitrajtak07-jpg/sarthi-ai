import type { ResumeData } from "@/types/resume"

interface TechTemplateProps {
  data: ResumeData
}

export default function TechTemplate({ data }: TechTemplateProps) {
  return (
    <div className="bg-gray-900 text-green-400 p-8 shadow-lg max-w-4xl mx-auto font-mono">
      {/* Header */}
      <div className="border border-green-400 p-6 mb-8">
        <div className="flex items-center mb-4">
          <span className="text-cyan-400 mr-2">$</span>
          <span className="text-white">whoami</span>
        </div>
        <h1 className="text-3xl font-bold text-cyan-400 mb-2">
          {data.personalInfo?.fullName || "developer@localhost"}
        </h1>
        <div className="text-green-300 space-y-1 text-sm">
          <p>
            <span className="text-cyan-400">email:</span> {data.personalInfo?.email || "dev@example.com"}
          </p>
          <p>
            <span className="text-cyan-400">phone:</span> {data.personalInfo?.phone || "+1-555-DEV-CODE"}
          </p>
          <p>
            <span className="text-cyan-400">location:</span> {data.personalInfo?.location || "Silicon Valley"}
          </p>
          {data.personalInfo?.linkedin && (
            <p>
              <span className="text-cyan-400">linkedin:</span> {data.personalInfo.linkedin}
            </p>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      {data.summary && (
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <span className="text-cyan-400 mr-2">$</span>
            <span className="text-white">cat about.txt</span>
          </div>
          <div className="border-l-2 border-green-400 pl-4">
            <p className="text-green-300 leading-relaxed">{data.summary}</p>
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-cyan-400 mr-2">$</span>
            <span className="text-white">ls -la experience/</span>
          </div>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="border-l-2 border-green-400 pl-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-400">{exp.position}</h3>
                    <p className="text-yellow-400">{exp.company}</p>
                  </div>
                  <span className="text-green-300 text-sm bg-gray-800 px-2 py-1 rounded">{exp.duration}</span>
                </div>
                <p className="text-green-300 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-cyan-400 mr-2">$</span>
            <span className="text-white">grep -r "skills" .</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="bg-gray-800 border border-green-400 px-3 py-2 text-center">
                <span className="text-green-400">{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-cyan-400 mr-2">$</span>
            <span className="text-white">find ./projects -type f -name "*.md"</span>
          </div>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="border border-green-400 p-4">
                <h3 className="text-lg font-bold text-cyan-400 mb-2">./{project.name}</h3>
                <p className="text-green-300 leading-relaxed mb-3">{project.description}</p>
                {project.technologies && (
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-800 text-yellow-400 text-xs border border-yellow-400"
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

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="text-cyan-400 mr-2">$</span>
            <span className="text-white">cat education.log</span>
          </div>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-green-400 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-400">{edu.degree}</h3>
                    <p className="text-yellow-400">{edu.school}</p>
                  </div>
                  <span className="text-green-300 text-sm bg-gray-800 px-2 py-1 rounded">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-green-400 pt-4 mt-8 text-center">
        <p className="text-green-400 text-sm">
          <span className="text-cyan-400">$</span> echo "Thanks for reviewing my resume!"
        </p>
      </div>
    </div>
  )
}
