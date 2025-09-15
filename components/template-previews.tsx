export const ModernTemplatePreview = () => (
  <div className="w-full h-80 bg-white rounded-lg shadow-lg overflow-hidden border">
    <div className="h-full flex">
      {/* Left sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-blue-600 to-blue-800 p-4 text-white">
        <div className="w-16 h-16 bg-white/20 rounded-full mb-4 flex items-center justify-center">
          <span className="text-lg font-bold">JD</span>
        </div>
        <h3 className="font-bold text-sm mb-1">John Doe</h3>
        <p className="text-xs opacity-90 mb-4">Software Developer</p>

        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-xs mb-2">CONTACT</h4>
            <div className="space-y-1 text-xs opacity-80">
              <div>📧 john@email.com</div>
              <div>📱 (555) 123-4567</div>
              <div>📍 New York, NY</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-xs mb-2">SKILLS</h4>
            <div className="flex flex-wrap gap-1">
              <span className="bg-white/20 px-2 py-1 rounded text-xs">React</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs">Node.js</span>
              <span className="bg-white/20 px-2 py-1 rounded text-xs">Python</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right content */}
      <div className="w-2/3 p-4 text-gray-800">
        <div className="mb-4">
          <h4 className="font-bold text-blue-600 text-sm mb-2">EXPERIENCE</h4>
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-xs">Senior Developer</h5>
              <p className="text-xs text-gray-600">Tech Corp • 2020-Present</p>
              <p className="text-xs mt-1">Led development of web applications using React and Node.js...</p>
            </div>
            <div>
              <h5 className="font-semibold text-xs">Junior Developer</h5>
              <p className="text-xs text-gray-600">StartUp Inc • 2018-2020</p>
              <p className="text-xs mt-1">Developed responsive websites and mobile applications...</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-blue-600 text-sm mb-2">EDUCATION</h4>
          <div>
            <h5 className="font-semibold text-xs">Computer Science, BS</h5>
            <p className="text-xs text-gray-600">University of Technology • 2018</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const CreativeTemplatePreview = () => (
  <div className="w-full h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg shadow-lg overflow-hidden border">
    <div className="h-full p-4">
      {/* Header */}
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="text-white font-bold text-lg">AS</span>
        </div>
        <h3 className="font-bold text-gray-800 text-lg">Alex Smith</h3>
        <p className="text-sm text-purple-600 font-medium">UX/UI Designer</p>
        <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-600">
          <span>📧 alex@email.com</span>
          <span>📱 (555) 987-6543</span>
          <span>📍 San Francisco, CA</span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <h4 className="font-bold text-purple-600 mb-2">EXPERIENCE</h4>
          <div className="space-y-2">
            <div className="bg-white/70 p-2 rounded-lg">
              <h5 className="font-semibold">Senior Designer</h5>
              <p className="text-gray-600">Design Studio • 2021-Now</p>
              <p className="text-gray-700 mt-1">Created user interfaces for mobile apps</p>
            </div>
            <div className="bg-white/70 p-2 rounded-lg">
              <h5 className="font-semibold">UI Designer</h5>
              <p className="text-gray-600">Creative Agency • 2019-2021</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-purple-600 mb-2">SKILLS</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between mb-1">
                <span>Figma</span>
                <span>95%</span>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"></div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Adobe XD</span>
                <span>90%</span>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-4/5"></div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span>Sketch</span>
                <span>85%</span>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>

          <div className="mt-3">
            <h4 className="font-bold text-purple-600 mb-2">EDUCATION</h4>
            <div className="bg-white/70 p-2 rounded-lg">
              <h5 className="font-semibold">Design, BA</h5>
              <p className="text-gray-600">Art Institute • 2019</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const ProfessionalTemplatePreview = () => (
  <div className="w-full h-80 bg-white rounded-lg shadow-lg overflow-hidden border">
    <div className="h-full p-4">
      {/* Header */}
      <div className="border-b border-gray-200 pb-3 mb-4">
        <h3 className="font-bold text-gray-800 text-xl">Michael Johnson</h3>
        <p className="text-gray-600 text-sm">Senior Business Analyst</p>
        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
          <span>📧 michael@email.com</span>
          <span>📱 (555) 456-7890</span>
          <span>📍 Chicago, IL</span>
          <span>🔗 linkedin.com/in/michael</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 text-xs">
        <div>
          <h4 className="font-bold text-gray-700 mb-1">PROFESSIONAL SUMMARY</h4>
          <p className="text-gray-600 leading-relaxed">
            Results-driven business analyst with 8+ years of experience in data analysis, process improvement, and
            strategic planning. Proven track record of increasing operational efficiency by 25% and leading
            cross-functional teams.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-700 mb-2">EXPERIENCE</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between">
                <h5 className="font-semibold">Senior Business Analyst</h5>
                <span className="text-gray-500">2020-Present</span>
              </div>
              <p className="text-gray-600">Fortune 500 Company, Chicago, IL</p>
              <ul className="list-disc list-inside text-gray-600 mt-1 space-y-0.5">
                <li>Improved operational efficiency by 25% through process optimization</li>
                <li>Led cross-functional teams of 10+ members on strategic initiatives</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-gray-700 mb-1">EDUCATION</h4>
            <div>
              <h5 className="font-semibold">MBA, Business Administration</h5>
              <p className="text-gray-600">Northwestern University • 2018</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-700 mb-1">SKILLS</h4>
            <div className="flex flex-wrap gap-1">
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">SQL</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">Tableau</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">Excel</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs">Python</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const MinimalistTemplatePreview = () => (
  <div className="w-full h-80 bg-gray-50 rounded-lg shadow-lg overflow-hidden border">
    <div className="h-full p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="font-light text-2xl text-gray-800 mb-1">Sarah Wilson</h3>
        <p className="text-gray-500 text-sm tracking-wide uppercase">Marketing Manager</p>
        <div className="w-16 h-px bg-gray-300 mx-auto mt-3"></div>
      </div>

      {/* Contact */}
      <div className="text-center mb-6">
        <div className="flex justify-center space-x-6 text-xs text-gray-600">
          <span>sarah@email.com</span>
          <span>(555) 321-0987</span>
          <span>Boston, MA</span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4 text-xs">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2 tracking-wide uppercase text-xs">Experience</h4>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium">Marketing Manager</h5>
                  <p className="text-gray-500">Digital Solutions Inc</p>
                </div>
                <span className="text-gray-400 text-xs">2021-Present</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-medium">Marketing Specialist</h5>
                  <p className="text-gray-500">Growth Agency</p>
                </div>
                <span className="text-gray-400 text-xs">2019-2021</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 tracking-wide uppercase text-xs">Education</h4>
            <div>
              <h5 className="font-medium">Marketing, BA</h5>
              <p className="text-gray-500">Boston University</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 tracking-wide uppercase text-xs">Skills</h4>
            <div className="space-y-1">
              <div className="text-gray-600">Digital Marketing</div>
              <div className="text-gray-600">SEO/SEM</div>
              <div className="text-gray-600">Analytics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const TechTemplatePreview = () => (
  <div className="w-full h-80 bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-green-500/30">
    <div className="h-full p-4 text-white">
      {/* Header */}
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-green-500 rounded-sm mr-3 flex items-center justify-center">
          <span className="text-black font-bold">DK</span>
        </div>
        <div>
          <h3 className="font-bold text-lg">David Kim</h3>
          <p className="text-green-400 text-sm">Full Stack Developer</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="col-span-2">
          <div className="mb-3">
            <h4 className="text-green-400 font-bold mb-2">$ EXPERIENCE</h4>
            <div className="space-y-2">
              <div className="bg-gray-800 p-2 rounded border border-green-500/20">
                <h5 className="text-white font-semibold">Senior Developer</h5>
                <p className="text-gray-400">TechStart • 2022-Present</p>
                <p className="text-gray-300 mt-1">Built scalable web applications using React, Node.js, and MongoDB</p>
              </div>
              <div className="bg-gray-800 p-2 rounded border border-green-500/20">
                <h5 className="text-white font-semibold">Developer</h5>
                <p className="text-gray-400">CodeCorp • 2020-2022</p>
                <p className="text-gray-300 mt-1">Developed microservices and APIs</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3">
            <h4 className="text-green-400 font-bold mb-2">CONTACT</h4>
            <div className="space-y-1 text-gray-300">
              <div>📧 david@dev.com</div>
              <div>🌐 github.com/david</div>
              <div>📍 San Francisco</div>
            </div>
          </div>

          <div>
            <h4 className="text-green-400 font-bold mb-2">STACK</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-300">React</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-300">Node.js</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-300">MongoDB</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-300">Docker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const ExecutiveTemplatePreview = () => (
  <div className="w-full h-80 bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200">
    <div className="h-full">
      {/* Header with gold accent */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4">
        <h3 className="font-bold text-xl">Robert Anderson</h3>
        <p className="text-gray-300 text-sm">Chief Executive Officer</p>
        <div className="flex space-x-4 mt-2 text-xs text-gray-400">
          <span>📧 robert@company.com</span>
          <span>📱 (555) 123-4567</span>
          <span>📍 New York, NY</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3 text-xs">
        <div>
          <h4 className="font-bold text-gray-800 mb-1 border-b border-gray-200 pb-1">EXECUTIVE SUMMARY</h4>
          <p className="text-gray-600 leading-relaxed">
            Visionary CEO with 15+ years of experience leading Fortune 500 companies. Proven track record of driving
            revenue growth, operational excellence, and strategic transformation initiatives.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1">LEADERSHIP EXPERIENCE</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between">
                <h5 className="font-semibold">Chief Executive Officer</h5>
                <span className="text-gray-500">2018-Present</span>
              </div>
              <p className="text-gray-600">Global Tech Corporation</p>
              <ul className="list-disc list-inside text-gray-600 mt-1">
                <li>Increased company revenue by 150% over 5 years</li>
                <li>Led successful IPO raising $500M in capital</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-gray-800 mb-1">EDUCATION</h4>
            <div>
              <h5 className="font-semibold">MBA, Executive Leadership</h5>
              <p className="text-gray-600">Harvard Business School</p>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-gray-800 mb-1">BOARD POSITIONS</h4>
            <div className="text-gray-600">
              <div>• Tech Innovation Board</div>
              <div>• Industry Advisory Council</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
