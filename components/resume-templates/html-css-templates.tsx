import type React from "react"

interface TemplatePreviewProps {
  templateName: string
  className?: string
}

export const ModernTemplate: React.FC<TemplatePreviewProps> = ({ className = "" }) => (
  <div className={`w-full h-64 bg-white rounded-lg overflow-hidden shadow-lg ${className}`}>
    <div className="h-full flex">
      <div className="w-1/3 bg-gradient-to-b from-blue-600 to-blue-800 p-4 text-white">
        <div className="w-16 h-16 bg-white/20 rounded-full mb-4 flex items-center justify-center">
          <span className="text-xl font-bold">JD</span>
        </div>
        <h3 className="font-bold text-sm mb-2">John Doe</h3>
        <p className="text-xs opacity-90 mb-4">Software Developer</p>
        <div className="space-y-2">
          <div className="text-xs">
            <div className="font-semibold mb-1">CONTACT</div>
            <div className="space-y-1 text-xs opacity-80">
              <div>📧 john@email.com</div>
              <div>📱 (555) 123-4567</div>
              <div>📍 New York, NY</div>
            </div>
          </div>
          <div className="text-xs">
            <div className="font-semibold mb-1">SKILLS</div>
            <div className="flex flex-wrap gap-1">
              <span className="bg-white/20 px-1 py-0.5 rounded text-xs">React</span>
              <span className="bg-white/20 px-1 py-0.5 rounded text-xs">Node.js</span>
              <span className="bg-white/20 px-1 py-0.5 rounded text-xs">Python</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 p-4 text-gray-800">
        <div className="mb-4">
          <h4 className="font-bold text-blue-600 text-sm mb-2">EXPERIENCE</h4>
          <div className="space-y-2">
            <div>
              <h5 className="font-semibold text-xs">Senior Developer</h5>
              <p className="text-xs text-gray-600">Tech Corp • 2020-Present</p>
              <p className="text-xs mt-1">Led development of web applications...</p>
            </div>
            <div>
              <h5 className="font-semibold text-xs">Junior Developer</h5>
              <p className="text-xs text-gray-600">StartUp Inc • 2018-2020</p>
              <p className="text-xs mt-1">Developed responsive websites...</p>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-blue-600 text-sm mb-2">EDUCATION</h4>
          <div>
            <h5 className="font-semibold text-xs">Computer Science</h5>
            <p className="text-xs text-gray-600">University of Technology • 2018</p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const CreativeTemplate: React.FC<TemplatePreviewProps> = ({ className = "" }) => (
  <div
    className={`w-full h-64 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg overflow-hidden shadow-lg ${className}`}
  >
    <div className="h-full p-4">
      <div className="text-center mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-2 flex items-center justify-center">
          <span className="text-white font-bold text-sm">AS</span>
        </div>
        <h3 className="font-bold text-gray-800 text-sm">Alex Smith</h3>
        <p className="text-xs text-purple-600 font-medium">UX/UI Designer</p>
        <div className="flex justify-center space-x-2 mt-2 text-xs text-gray-600">
          <span>📧 alex@email.com</span>
          <span>📱 (555) 987-6543</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <h4 className="font-bold text-purple-600 mb-2">EXPERIENCE</h4>
          <div className="space-y-2">
            <div className="bg-white/50 p-2 rounded">
              <h5 className="font-semibold">Senior Designer</h5>
              <p className="text-gray-600">Design Studio • 2021-Now</p>
            </div>
            <div className="bg-white/50 p-2 rounded">
              <h5 className="font-semibold">UI Designer</h5>
              <p className="text-gray-600">Creative Agency • 2019-2021</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-purple-600 mb-2">SKILLS</h4>
          <div className="space-y-1">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"></div>
            <span className="text-xs">Figma</span>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-4/5"></div>
            <span className="text-xs">Adobe XD</span>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-3/5"></div>
            <span className="text-xs">Sketch</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const ProfessionalTemplate: React.FC<TemplatePreviewProps> = ({ className = "" }) => (
  <div className={`w-full h-64 bg-white rounded-lg overflow-hidden shadow-lg border ${className}`}>
    <div className="h-full p-4">
      <div className="border-b border-gray-200 pb-3 mb-3">
        <h3 className="font-bold text-gray-800 text-lg">Michael Johnson</h3>
        <p className="text-gray-600 text-sm">Senior Business Analyst</p>
        <div className="flex space-x-4 mt-2 text-xs text-gray-500">
          <span>📧 michael@email.com</span>
          <span>📱 (555) 456-7890</span>
          <span>📍 Chicago, IL</span>
          <span>🔗 linkedin.com/in/michael</span>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        <div>
          <h4 className="font-bold text-gray-700 mb-1">PROFESSIONAL SUMMARY</h4>
          <p className="text-gray-600 leading-relaxed">
            Results-driven business analyst with 8+ years of experience in data analysis and process improvement...
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-700 mb-1">EXPERIENCE</h4>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between">
                <h5 className="font-semibold">Senior Business Analyst</h5>
                <span className="text-gray-500">2020-Present</span>
              </div>
              <p className="text-gray-600">Fortune 500 Company, Chicago, IL</p>
              <ul className="list-disc list-inside text-gray-600 mt-1 space-y-0.5">
                <li>Improved operational efficiency by 25%</li>
                <li>Led cross-functional teams of 10+ members</li>
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
              <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">SQL</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">Tableau</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">Excel</span>
              <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">Python</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const MinimalistTemplate: React.FC<TemplatePreviewProps> = ({ className = "" }) => (
  <div className={`w-full h-64 bg-gray-50 rounded-lg overflow-hidden shadow-lg ${className}`}>
    <div className="h-full p-6">
      <div className="text-center mb-6">
        <h3 className="font-light text-2xl text-gray-800 mb-1">Sarah Wilson</h3>
        <p className="text-gray-500 text-sm tracking-wide">MARKETING MANAGER</p>
        <div className="w-16 h-px bg-gray-300 mx-auto mt-2"></div>
      </div>

      <div className="space-y-4 text-xs">
        <div className="text-center">
          <div className="flex justify-center space-x-6 text-gray-600">
            <span>sarah@email.com</span>
            <span>(555) 321-0987</span>
            <span>Boston, MA</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2 tracking-wide">EXPERIENCE</h4>
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
            <h4 className="font-semibold text-gray-700 mb-2 tracking-wide">EDUCATION</h4>
            <div>
              <h5 className="font-medium">Marketing, BA</h5>
              <p className="text-gray-500">Boston University</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2 tracking-wide">SKILLS</h4>
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

export const TechTemplate: React.FC<TemplatePreviewProps> = ({ className = "" }) => (
  <div className={`w-full h-64 bg-gray-900 rounded-lg overflow-hidden shadow-lg ${className}`}>
    <div className="h-full p-4 text-white">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-green-500 rounded-sm mr-3 flex items-center justify-center">
          <span className="text-black font-bold text-sm">DK</span>
        </div>
        <div>
          <h3 className="font-bold text-lg">David Kim</h3>
          <p className="text-green-400 text-sm">Full Stack Developer</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-xs">
        <div className="col-span-2">
          <div className="mb-3">
            <h4 className="text-green-400 font-bold mb-1">$ EXPERIENCE</h4>
            <div className="space-y-2">
              <div className="bg-gray-800 p-2 rounded">
                <h5 className="text-white font-semibold">Senior Developer</h5>
                <p className="text-gray-400">TechStart • 2022-Present</p>
                <p className="text-gray-300 mt-1">Built scalable web applications...</p>
              </div>
              <div className="bg-gray-800 p-2 rounded">
                <h5 className="text-white font-semibold">Developer</h5>
                <p className="text-gray-400">CodeCorp • 2020-2022</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-3">
            <h4 className="text-green-400 font-bold mb-1">CONTACT</h4>
            <div className="space-y-1 text-gray-300">
              <div>📧 david@dev.com</div>
              <div>🌐 github.com/david</div>
              <div>📍 San Francisco</div>
            </div>
          </div>

          <div>
            <h4 className="text-green-400 font-bold mb-1">STACK</h4>
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

// Export all templates
export const htmlCssTemplates = {
  ModernTemplate,
  CreativeTemplate,
  ProfessionalTemplate,
  MinimalistTemplate,
  TechTemplate,
}
