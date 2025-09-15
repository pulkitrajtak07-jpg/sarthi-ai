export function ProfessionalTemplate({ resumeData, variant = "default" }) {
  const { personalInfo, summary, experience, education, skills, projects, languages } = resumeData

  return (
    <div className="font-serif text-gray-800 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">{personalInfo.name || "Your Name"}</h1>
        <div className="text-sm flex flex-wrap justify-center gap-x-4 gap-y-1">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-2">Professional Summary</h2>
          <p className="text-sm">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={exp.id || index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{exp.title || "Job Title"}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate || "Start Date"} - {exp.endDate || "End Date"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-semibold">{exp.company || "Company Name"}</h4>
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
          <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{edu.degree || "Degree"}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate || "Start Date"} - {edu.endDate || "End Date"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-semibold">{edu.institution || "Institution"}</h4>
                  {edu.location && <span className="text-sm">{edu.location}</span>}
                </div>
                {edu.description && <p className="text-sm mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="text-sm bg-gray-100 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={project.id || index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold">{project.title || "Project Title"}</h3>
                  {project.link && (
                    <a href={project.link} className="text-xs text-blue-600 hover:underline">
                      View Project
                    </a>
                  )}
                </div>
                {project.technologies && <p className="text-sm font-semibold">{project.technologies}</p>}
                {project.description && <p className="text-sm mt-1">{project.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase border-b-2 border-gray-300 pb-1 mb-3">Languages</h2>
          <p className="text-sm">{languages.join(", ")}</p>
        </section>
      )}
    </div>
  )
}

// Add default export
export default ProfessionalTemplate
