interface WoodworkingTemplateProps {
  resumeData: any
  variant?: string
}

export function WoodworkingTemplate({ resumeData, variant = "default" }: WoodworkingTemplateProps) {
  return (
    <div className="woodworking-template font-sans text-[10pt] w-full h-full">
      {/* Main container with sidebar */}
      <div className="relative flex flex-col min-h-[1056px]">
        {/* Red sidebar */}
        <div className="absolute left-0 top-0 w-[273px] h-full bg-[#D14140] z-0"></div>

        {/* Main content */}
        <div className="relative z-10 w-full">
          <table className="w-[95%] mx-auto border-collapse">
            <tbody>
              {/* Header row with initials and name */}
              <tr className="h-[44.55pt]">
                <td className="w-[124.85pt] align-top p-[0in_5.75pt_0in_5.75pt]">
                  <p className="text-[24pt] font-bold font-['Georgia',serif] text-[#D14140] mt-[6pt] mb-[6pt] ml-[0.2in]">
                    {resumeData.personalInfo.name
                      ? `${resumeData.personalInfo.name.split(" ")[0][0]}${
                          resumeData.personalInfo.name.split(" ")[1]?.[0] || ""
                        }`
                      : "JM"}
                  </p>
                </td>
                <td className="w-[43.35pt] align-top p-[0in_5.75pt_0in_5.75pt]">&nbsp;</td>
                <td className="w-[349.35pt] align-top p-[0in_5.75pt_0in_5.75pt]" colSpan={5}>
                  <p className="text-[24pt] font-bold font-['Georgia',serif] text-black mt-[6pt] mb-0">
                    {resumeData.personalInfo.name || "Jordan Mitchell"}
                  </p>
                </td>
              </tr>

              {/* Summary row */}
              <tr className="h-[73.35pt]">
                <td className="w-[124.85pt] align-top p-[0in_5.75pt_0in_5.75pt]">&nbsp;</td>
                <td className="w-[43.35pt] align-top p-[0in_5.75pt_0in_5.75pt]">&nbsp;</td>
                <td className="w-[349.35pt] align-top p-[0in_5.75pt_0in_5.75pt]" colSpan={5}>
                  <p className="font-['Gill_Sans_MT',sans-serif]">
                    {resumeData.summary ||
                      "Experienced woodworker with 5+ years of experience in designing and crafting custom furniture and cabinetry. Proficient in using a variety of woodworking tools and techniques, with a focus on precision and attention to detail."}
                  </p>
                </td>
              </tr>

              {/* Main content row */}
              <tr className="h-auto">
                {/* Left sidebar with contact info */}
                <td
                  className="w-[124.85pt] align-top p-[0in_5.75pt_0in_5.75pt]"
                  rowSpan={10}
                  style={{ height: "auto" }}
                >
                  <p className="font-bold font-['Georgia',serif] text-white mt-[3pt] mb-[6pt]">Location</p>
                  <p className="text-white font-['Gill_Sans_MT',sans-serif]">
                    {resumeData.personalInfo.location || "Boston, MA"}
                  </p>
                  <p className="text-white">&nbsp;</p>
                  <div className="w-[98px] h-[1px] bg-white my-2"></div>
                  <p className="text-white">&nbsp;</p>

                  <p className="font-bold font-['Georgia',serif] text-white mt-[3pt] mb-[6pt]">Phone</p>
                  <p className="text-white font-['Gill_Sans_MT',sans-serif]">
                    {resumeData.personalInfo.phone || "(202) 555-0122"}
                  </p>
                  <p className="text-white">&nbsp;</p>
                  <div className="w-[98px] h-[1px] bg-white my-2"></div>
                  <p className="text-white">&nbsp;</p>

                  <p className="font-bold font-['Georgia',serif] text-white mt-[3pt] mb-[6pt]">Email</p>
                  <p className="text-white font-['Gill_Sans_MT',sans-serif]">
                    {resumeData.personalInfo.email || "jordan@example.com"}
                  </p>
                  <p className="text-white">&nbsp;</p>
                  <div className="w-[98px] h-[1px] bg-white my-2"></div>
                  <p className="text-white">&nbsp;</p>

                  <p className="font-bold font-['Georgia',serif] text-white mt-[3pt] mb-[6pt]">Website</p>
                  <p className="text-white font-['Gill_Sans_MT',sans-serif]">
                    {resumeData.personalInfo.website || "www.greatsiteaddress.com"}
                  </p>
                </td>

                {/* Spacer column */}
                <td className="w-[43.35pt] align-top p-[0in_5.75pt_0in_5.75pt]" rowSpan={10} style={{ height: "auto" }}>
                  &nbsp;
                </td>

                {/* Experience section header */}
                <td
                  className="w-[79.3pt] align-top p-[0in_5.75pt_0in_5.75pt]"
                  colSpan={3}
                  rowSpan={2}
                  style={{ height: ".15in" }}
                >
                  <h1 className="font-bold font-['Georgia',serif] text-[10pt] mt-[3pt] mb-0">Experience</h1>
                </td>
                <td
                  className="w-[270.05pt] align-top p-[0in_5.75pt_0in_5.75pt] border-b-[1.5pt] border-b-solid border-b-black"
                  colSpan={2}
                  style={{ height: ".15in" }}
                >
                  <h1 className="font-bold font-['Georgia',serif] text-[7pt] mt-[3pt] mb-0">&nbsp;</h1>
                </td>
              </tr>

              {/* Experience section content */}
              <tr style={{ height: ".15in" }}>
                <td
                  className="w-[270.05pt] align-top p-[0in_5.75pt_0in_5.75pt]"
                  colSpan={2}
                  style={{ height: ".15in" }}
                >
                  <h1 className="font-bold font-['Georgia',serif] text-[7pt] mt-[3pt] mb-0">&nbsp;</h1>
                </td>
              </tr>

              <tr style={{ height: "4.3in" }}>
                <td className="w-[349.35pt] align-top p-[0in_5.75pt_0in_5.75pt]" colSpan={5}>
                  {/* Map through experiences */}
                  {resumeData.experience && resumeData.experience.length > 0 ? (
                    resumeData.experience.map((exp, index) => (
                      <div key={exp.id || index} className="mb-6">
                        <h2 className="font-bold font-['Gill_Sans_MT',sans-serif] text-[10pt] mt-[12pt] mb-0">
                          {exp.startDate} – {exp.current ? "present" : exp.endDate}
                        </h2>
                        <h3 className="font-normal font-['Gill_Sans_MT',sans-serif] text-[10pt] mt-0 mb-[6pt]">
                          {exp.title}{" "}
                          <span className="text-[#D14140]">
                            {" "}
                            | <span className="text-black">{exp.company}</span> |{" "}
                            <span className="text-black">{exp.location}</span>
                          </span>
                        </h3>
                        <div className="pl-[0.5in]">
                          {exp.description.split("\n").map((line, i) => (
                            <p
                              key={i}
                              className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]"
                            >
                              <span className="absolute left-0">·</span>
                              {line.trim()}
                            </p>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <h2 className="font-bold font-['Gill_Sans_MT',sans-serif] text-[10pt] mt-[12pt] mb-0">
                        20XX – present
                      </h2>
                      <h3 className="font-normal font-['Gill_Sans_MT',sans-serif] text-[10pt] mt-0 mb-[6pt]">
                        Woodworker{" "}
                        <span className="text-[#D14140]">
                          {" "}
                          | <span className="text-black">Sand + Polish Contractors</span> |{" "}
                          <span className="text-black">Boston, MA</span>
                        </span>
                      </h3>
                      <div className="pl-[0.5in]">
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Collaborated with clients to design and build custom furniture pieces, including chairs,
                          tables, and bookcases
                        </p>
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Operated various woodworking tools and machinery to cut, shape, and sand wood
                        </p>
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Maintained a clean and organized workshop environment
                        </p>
                      </div>

                      <h2 className="font-bold font-['Gill_Sans_MT',sans-serif] text-[10pt] mt-[12pt] mb-0">
                        20XX – 20XX
                      </h2>
                      <h3 className="font-normal font-['Gill_Sans_MT',sans-serif] text-[10pt] mt-0 mb-[6pt]">
                        Woodworker{" "}
                        <span className="text-[#D14140]">
                          {" "}
                          | <span className="text-black">Demo and Build Construction, LLC</span>
                        </span>{" "}
                        <span className="text-[#D14140]">
                          {" "}
                          | <span className="text-black">Boston, MA</span>
                        </span>
                      </h3>
                      <div className="pl-[0.5in]">
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Assisted senior woodworkers in building and installing cabinetry and custom furniture pieces
                        </p>
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Operated woodworking tools and machinery under the supervision of senior woodworkers
                        </p>
                      </div>
                    </>
                  )}
                </td>
              </tr>

              {/* Education section header */}
              <tr style={{ height: "9.0pt" }}>
                <td
                  className="w-[74.8pt] align-top p-[0in_5.75pt_0in_5.75pt]"
                  colSpan={2}
                  rowSpan={2}
                  style={{ height: "9.0pt" }}
                >
                  <h1 className="font-bold font-['Georgia',serif] text-[10pt] mt-[3pt] mb-0">Education</h1>
                </td>
                <td
                  className="w-[274.55pt] align-top p-[0in_5.75pt_0in_5.75pt] border-b-[1.5pt] border-b-solid border-b-black"
                  colSpan={3}
                  style={{ height: "9.0pt" }}
                >
                  <h1 className="font-bold font-['Georgia',serif] text-[7pt] mt-[3pt] mb-0">&nbsp;</h1>
                </td>
              </tr>

              <tr style={{ height: "9.0pt" }}>
                <td
                  className="w-[274.55pt] align-top p-[0in_5.75pt_0in_5.75pt]"
                  colSpan={3}
                  style={{ height: "9.0pt" }}
                >
                  <h1 className="font-bold font-['Georgia',serif] text-[7pt] mt-[3pt] mb-0">&nbsp;</h1>
                </td>
              </tr>

              {/* Education section content */}
              <tr style={{ height: ".4in" }}>
                <td className="w-[349.35pt] p-[0in_5.75pt_0in_5.75pt]" colSpan={5} style={{ height: ".4in" }}>
                  <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt]">
                    {resumeData.education && resumeData.education.length > 0
                      ? resumeData.education[0].institution
                      : "Clover College of the Arts"}{" "}
                    <span className="text-[#D14140]">| </span>
                    {resumeData.education && resumeData.education.length > 0
                      ? resumeData.education[0].location
                      : "Boston, MA"}
                  </p>
                </td>
              </tr>

              <tr style={{ height: "67.5pt" }}>
                <td className="w-[34.3pt] align-top p-[0in_5.75pt_0in_5.75pt]" style={{ height: "67.5pt" }}>
                  <p className="mb-[6pt]">&nbsp;</p>
                </td>
                <td
                  className="w-[315.05pt] align-top p-[0in_5.75pt_0in_5.75pt]"
                  colSpan={4}
                  style={{ height: "67.5pt" }}
                >
                  {resumeData.education && resumeData.education.length > 0 ? (
                    resumeData.education.map((edu, index) => (
                      <p key={edu.id || index} className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-2">
                        <b>{edu.endDate}</b> <span className="text-[#D14140]">| </span>
                        <span>{edu.degree}</span>
                      </p>
                    ))
                  ) : (
                    <>
                      <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-2">
                        <b>June 20XX</b> <span className="text-[#D14140]">| </span>
                        <span>Certificate in Woodworking</span>
                      </p>
                      <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt]">
                        <b>June 20XX</b> <span className="text-[#D14140]">| </span>
                        <span>Associate of Applied Science in Wood Technology</span>
                      </p>
                    </>
                  )}
                </td>
              </tr>

              {/* Skills section header */}
              <tr style={{ height: ".1in" }}>
                <td
                  className="w-[164.8pt] align-top p-[0in_5.75pt_0in_5.75pt]"
                  colSpan={4}
                  rowSpan={2}
                  style={{ height: ".1in" }}
                >
                  <h1 className="font-bold font-['Georgia',serif] text-[10pt] mt-[3pt] mb-0">
                    Key skills and characteristics
                  </h1>
                </td>
                <td
                  className="w-[184.55pt] align-top p-[0in_5.75pt_0in_5.75pt] border-b-[1.5pt] border-b-solid border-b-black"
                  style={{ height: ".1in" }}
                >
                  <h1 className="font-bold font-['Georgia',serif] text-[7pt] mt-[3pt] mb-0">&nbsp;</h1>
                </td>
              </tr>

              <tr style={{ height: ".1in" }}>
                <td className="w-[184.55pt] align-top p-[0in_5.75pt_0in_5.75pt]" style={{ height: ".1in" }}>
                  <h1 className="font-bold font-['Georgia',serif] text-[7pt] mt-[3pt] mb-0">&nbsp;</h1>
                </td>
              </tr>

              {/* Skills section content */}
              <tr style={{ height: "87.3pt" }}>
                <td className="w-[349.35pt] p-[0in_5.75pt_0in_5.75pt]" colSpan={5} style={{ height: "87.3pt" }}>
                  <div className="pl-[0.5in]">
                    {resumeData.skills && resumeData.skills.length > 0 ? (
                      resumeData.skills.map((skill, index) => (
                        <p
                          key={index}
                          className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]"
                        >
                          <span className="absolute left-0">·</span>
                          {skill}
                        </p>
                      ))
                    ) : (
                      <>
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Proficient in using hand and power tools such as saws, drills, sanders, and routers
                        </p>
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Skilled in reading and interpreting blueprints and schematics
                        </p>
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Experienced in designing and building custom furniture and cabinetry
                        </p>
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Knowledgeable in different types of wood and their characteristics
                        </p>
                        <p className="font-['Gill_Sans_MT',sans-serif] text-[10pt] mb-1 relative pl-[0.25in] -ml-[0.25in]">
                          <span className="absolute left-0">·</span>
                          Strong attention to detail and ability to produce high-quality work
                        </p>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Add default export
export default WoodworkingTemplate
