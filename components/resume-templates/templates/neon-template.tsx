export function NeonTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, languages } = resumeData

  return (
    <div className="font-sans text-white bg-gray-900 max-w-4xl mx-auto p-8 rounded-lg">
      {/* Header */}
      <header className="mb-8 relative">
        <div className="absolute -inset-4 rounded-full bg-fuchsia-500/20 blur-xl"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold text-fuchsia-400 mb-2 text-center">{personalInfo.name || "Your Name"}</h1>
          <div className="text-sm space-y-1 text-center">
            {personalInfo.email && <div className="text-gray-300">{personalInfo.email}</div>}
            <div className="flex justify-center gap-x-4 text-gray-300">
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
              {personalInfo.location && <span>{personalInfo.location}</span>}
            </div>
            <div className="flex justify-center gap-x-4 text-gray-300">
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6 relative">
          <div className="absolute -inset-1 bg-fuchsia-500/10 rounded-lg blur-sm"></div>
          <div className="relative bg-gray-800/80 p-4 rounded-lg border border-fuchsia-500/30">
            <h2 className="text-lg font-semibold text-fuchsia-400 border-b border-fuchsia-500/30 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-300">{summary}</p>
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6 relative">
          <div className="absolute -inset-1 bg-fuchsia-500/5 rounded-lg blur-sm"></div>
          <div className="relative bg-gray-800/80 p-4 rounded-lg border border-fuchsia-500/30">
            <h2 className="text-lg font-semibold text-fuchsia-400 border-b border-fuchsia-500/30 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div key={exp.id || index} className="relative">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-white">{exp.title || "Job Title"}</h3>
                    <span className="text-sm text-gray-400">
                      {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="text-sm text-fuchsia-300">{exp.company || "Company Name"}</h4>
                    {exp.location && <span className="text-sm text-gray-400">{exp.location}</span>}
                  </div>
                  {exp.description && (
                    <p className="text-sm mt-1 text-gray-300 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Two-column layout for Skills and Education */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="relative">
              <div className="absolute -inset-1 bg-fuchsia-500/10 rounded-lg blur-sm"></div>
              <div className="relative bg-gray-800/80 p-4 rounded-lg border border-fuchsia-500/30">
                <h2 className="text-lg font-semibold text-fuchsia-400 border-b border-fuchsia-500/30 pb-1 mb-3">
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-fuchsia-500/20 text-fuchsia-300 px-2 py-1 rounded-md text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="relative">
              <div className="absolute -inset-1 bg-fuchsia-500/10 rounded-lg blur-sm"></div>
              <div className="relative bg-gray-800/80 p-4 rounded-lg border border-fuchsia-500/30">
                <h2 className="text-lg font-semibold text-fuchsia-400 border-b border-fuchsia-500/30 pb-1 mb-3">
                  Languages
                </h2>
                <ul className="space-y-1">
                  {languages.map((language, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-fuchsia-400 rounded-full mr-2"></span>
                      {language}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="w-full md:w-1/2 space-y-6">
          {/* Education */}
          {education.length > 0 && (
            <section className="relative">
              <div className="absolute -inset-1 bg-fuchsia-500/10 rounded-lg blur-sm"></div>
              <div className="relative bg-gray-800/80 p-4 rounded-lg border border-fuchsia-500/30">
                <h2 className="text-lg font-semibold text-fuchsia-400 border-b border-fuchsia-500/30 pb-1 mb-3">
                  Education
                </h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={edu.id || index} className="relative">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-white">{edu.degree || "Degree"}</h3>
                        <span className="text-sm text-gray-400">
                          {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-sm text-fuchsia-300">{edu.institution || "Institution"}</h4>
                        {edu.location && <span className="text-sm text-gray-400">{edu.location}</span>}
                      </div>
                      {edu.description && <p className="text-sm mt-1 text-gray-300">{edu.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="relative">
              <div className="absolute -inset-1 bg-fuchsia-500/10 rounded-lg blur-sm"></div>
              <div className="relative bg-gray-800/80 p-4 rounded-lg border border-fuchsia-500/30">
                <h2 className="text-lg font-semibold text-fuchsia-400 border-b border-fuchsia-500/30 pb-1 mb-3">
                  Projects
                </h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={project.id || index} className="relative">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-white">{project.title || "Project Title"}</h3>
                        {project.link && (
                          <a href={project.link} className="text-xs text-fuchsia-400 hover:underline">
                            View Project
                          </a>
                        )}
                      </div>
                      {project.technologies && <p className="text-sm text-fuchsia-300">{project.technologies}</p>}
                      {project.description && <p className="text-sm mt-1 text-gray-300">{project.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Add default export
export default NeonTemplate
