export function CreativeTemplate({ resumeData }) {
  const { personalInfo, summary, experience, education, skills, projects, languages } = resumeData

  return (
    <div className="font-sans text-gray-800 max-w-4xl mx-auto">
      {/* Header with accent color */}
      <header className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-t-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">{personalInfo.name || "Your Name"}</h1>
        <p className="text-lg mb-4">{experience[0]?.title || "Professional Title"}</p>
        <div className="text-sm flex flex-wrap gap-x-4 gap-y-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        <div className="text-sm flex flex-wrap gap-x-4 gap-y-1 mt-1">
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </header>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column */}
        <div className="w-full md:w-1/3 space-y-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-emerald-600 mb-3">Skills</h2>
              <div className="space-y-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-emerald-600 mb-3">Languages</h2>
              <div className="space-y-2">
                {languages.map((language, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                    <span className="text-sm">{language}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-bold text-emerald-600 mb-3">Education</h2>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div key={edu.id || index}>
                    <h3 className="font-semibold">{edu.degree || "Degree"}</h3>
                    <p className="text-sm">{edu.institution || "Institution"}</p>
                    <p className="text-xs text-gray-600">
                      {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                    </p>
                    {edu.location && <p className="text-xs">{edu.location}</p>}
                    {edu.description && <p className="text-xs mt-1">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right column */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Summary */}
          {summary && (
            <section>
              <h2 className="text-lg font-bold text-emerald-600 border-b border-emerald-200 pb-1 mb-3">About Me</h2>
              <p className="text-sm">{summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-emerald-600 border-b border-emerald-200 pb-1 mb-3">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, index) => (
                  <div
                    key={exp.id || index}
                    className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-emerald-200"
                  >
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-emerald-500 -translate-x-1/2"></div>
                    <h3 className="font-bold">{exp.title || "Job Title"}</h3>
                    <p className="text-sm font-semibold">{exp.company || "Company Name"}</p>
                    <p className="text-xs text-gray-600">
                      {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                      {exp.location && ` | ${exp.location}`}
                    </p>
                    {exp.description && <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-emerald-600 border-b border-emerald-200 pb-1 mb-3">Projects</h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id || index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-bold">{project.title || "Project Title"}</h3>
                      {project.link && (
                        <a href={project.link} className="text-xs text-emerald-600 hover:underline">
                          View Project
                        </a>
                      )}
                    </div>
                    {project.technologies && <p className="text-xs font-semibold">{project.technologies}</p>}
                    {project.description && <p className="text-sm mt-1">{project.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

// Add default export
export default CreativeTemplate
