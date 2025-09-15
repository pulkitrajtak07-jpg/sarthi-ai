export function ModernTemplate({ resumeData, variant = "default" }) {
  const { personalInfo, summary, experience, education, skills, projects, languages } = resumeData

  return (
    <div className="font-sans text-gray-800 max-w-4xl mx-auto">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-emerald-700 mb-2">{personalInfo.name || "Your Name"}</h1>
        <div className="text-sm space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          <div className="flex justify-center gap-x-4">
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          <div className="flex justify-center gap-x-4">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-emerald-700 border-b border-emerald-200 pb-1 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-emerald-700 border-b border-emerald-200 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={exp.id || index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{exp.title || "Job Title"}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm italic">{exp.company || "Company Name"}</h4>
                  {exp.location && <span className="text-sm">{exp.location}</span>}
                </div>
                {exp.description && <p className="text-sm mt-1 whitespace-pre-line">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-emerald-700 border-b border-emerald-200 pb-1 mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold">{edu.degree || "Degree"}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm italic">{edu.institution || "Institution"}</h4>
                  {edu.location && <span className="text-sm">{edu.location}</span>}
                </div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Two-column layout for Skills and Projects */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Skills */}
        <div className="w-full md:w-1/2">
          {skills.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-emerald-700 border-b border-emerald-200 pb-1 mb-3">Skills</h2>
              <ul className="list-disc list-inside text-sm">
                {skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-emerald-700 border-b border-emerald-200 pb-1 mb-3">
                Languages
              </h2>
              <ul className="list-disc list-inside text-sm">
                {languages.map((language, index) => (
                  <li key={index}>{language}</li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Projects */}
        <div className="w-full md:w-1/2">
          {projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-lg font-semibold text-emerald-700 border-b border-emerald-200 pb-1 mb-3">Projects</h2>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={project.id || index}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-semibold">{project.title || "Project Title"}</h3>
                      {project.link && (
                        <a href={project.link} className="text-xs text-emerald-600 hover:underline">
                          View Project
                        </a>
                      )}
                    </div>
                    {project.technologies && <p className="text-sm italic">{project.technologies}</p>}
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
export default ModernTemplate
