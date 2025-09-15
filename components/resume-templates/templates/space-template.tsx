export function SpaceTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, languages } = resumeData

  return (
    <div className="font-sans text-white bg-gray-900 max-w-4xl mx-auto p-8 rounded-lg">
      {/* Header */}
      <header className="mb-8 relative">
        <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-xl"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold text-cyan-400 mb-2 text-center">{personalInfo.name || "Your Name"}</h1>
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
          <div className="absolute -inset-1 bg-cyan-500/10 rounded-lg blur-sm"></div>
          <div className="relative bg-gray-800/80 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-cyan-400 border-b border-cyan-500/30 pb-1 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-gray-300">{summary}</p>
          </div>
        </section>
      )}

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Experience */}
          {experience.length > 0 && (
            <section className="relative">
              <div className="absolute -inset-1 bg-cyan-500/5 rounded-lg blur-sm"></div>
              <div className="relative bg-gray-800/80 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-cyan-400 border-b border-cyan-500/30 pb-1 mb-3">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {experience.map((exp, index) => (
                    <div key={exp.id || index} className="relative pl-4 border-l border-cyan-500/30">
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-cyan-500 -translate-x-1/2"></div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-white">{exp.title || "Job Title"}</h3>
                        <span className="text-sm text-gray-400">
                          {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-sm text-cyan-300">{exp.company || "Company Name"}</h4>
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

          {/* Education */}
          {education.length > 0 && (
            <section className="relative">
              <div className="absolute -inset-1 bg-cyan-500/5 rounded-lg blur-sm"></div>
              <div className="relative bg-gray-800/80 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-cyan-400 border-b border-cyan-500/30 pb-1 mb-3">Education</h2>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={edu.id || index} className="relative pl-4 border-l border-cyan-500/30">
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-cyan-500 -translate-x-1/2"></div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-white">{edu.degree || "Degree"}</h3>
                        <span className="text-sm text-gray-400">
                          {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="text-sm text-cyan-300">{edu.institution || "Institution"}</h4>
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
              <div className="absolute -inset-1 bg-cyan-500/5 rounded-lg blur-sm"></div>
              <div className="relative bg-gray-800/80 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-cyan-400 border-b border-cyan-500/30 pb-1 mb-3">Projects</h2>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={project.id || index} className="relative pl-4 border-l border-cyan-500/30">
                      <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-cyan-500 -translate-x-1/2"></div>
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-semibold text-white">{project.title || "Project Title"}</h3>
                        {project.link && (
                          <a href={project.link} className="text-xs text-cyan-400 hover:underline">
                            View Project
                          </a>
                        )}
                      </div>
                      {project.technologies && <p className="text-sm text-cyan-300">{project.technologies}</p>}
                      {project.description && <p className="text-sm mt-1 text-gray-300">{project.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="relative">
              <div className="absolute -inset-1 bg-cyan-500/10 rounded-lg blur-sm"></div>
              <div className="relative bg-gray-800/80 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-cyan-400 border-b border-cyan-500/30 pb-1 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-md text-xs">
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
              <div className="absolute -inset-1 bg-cyan-500/10 rounded-lg blur-sm"></div>
              <div className="relative bg-gray-800/80 p-4 rounded-lg">
                <h2 className="text-lg font-semibold text-cyan-400 border-b border-cyan-500/30 pb-1 mb-3">Languages</h2>
                <ul className="space-y-1">
                  {languages.map((language, index) => (
                    <li key={index} className="text-sm text-gray-300 flex items-center">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></span>
                      {language}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Contact Information (Detailed) */}
          <section className="relative">
            <div className="absolute -inset-1 bg-cyan-500/10 rounded-lg blur-sm"></div>
            <div className="relative bg-gray-800/80 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-cyan-400 border-b border-cyan-500/30 pb-1 mb-3">Contact</h2>
              <ul className="space-y-2">
                {personalInfo.email && (
                  <li className="text-sm text-gray-300 flex items-start">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 mt-1.5"></span>
                    <div>
                      <span className="text-cyan-300 block text-xs">Email</span>
                      {personalInfo.email}
                    </div>
                  </li>
                )}
                {personalInfo.phone && (
                  <li className="text-sm text-gray-300 flex items-start">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 mt-1.5"></span>
                    <div>
                      <span className="text-cyan-300 block text-xs">Phone</span>
                      {personalInfo.phone}
                    </div>
                  </li>
                )}
                {personalInfo.location && (
                  <li className="text-sm text-gray-300 flex items-start">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 mt-1.5"></span>
                    <div>
                      <span className="text-cyan-300 block text-xs">Location</span>
                      {personalInfo.location}
                    </div>
                  </li>
                )}
                {personalInfo.linkedin && (
                  <li className="text-sm text-gray-300 flex items-start">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 mt-1.5"></span>
                    <div>
                      <span className="text-cyan-300 block text-xs">LinkedIn</span>
                      {personalInfo.linkedin}
                    </div>
                  </li>
                )}
                {personalInfo.website && (
                  <li className="text-sm text-gray-300 flex items-start">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2 mt-1.5"></span>
                    <div>
                      <span className="text-cyan-300 block text-xs">Website</span>
                      {personalInfo.website}
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

// Add default export
export default SpaceTemplate
