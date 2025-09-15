import Link from "next/link"
import { Linkedin, Github, Twitter, Mail, Phone, MapPin, Sparkles, Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-800/50 bg-black/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-blue-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Sarthi AI
              </h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              AI-powered resume builder and job finder to help you land your dream job. Transform your career with
              intelligent resume analysis, professional templates, and personalized job recommendations.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="h-4 w-4" />
                <span>contact@sarthi-ai.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-purple-400 transition-colors">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/sarthi-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-gray-500/10 text-gray-400 hover:text-gray-300 hover:bg-gray-500/20 hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="#"
                className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Resources
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/resume-templates"
                  className="text-gray-400 hover:text-purple-400 hover:shadow-lg hover:shadow-purple-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Resume Templates
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/press"
                  className="text-gray-400 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="/partners"
                  className="text-gray-400 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  href="/investors"
                  className="text-gray-400 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Investors
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-gray-400 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/gdpr"
                  className="text-gray-400 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/20 px-2 py-1 rounded transition-all duration-300"
                >
                  GDPR
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© {new Date().getFullYear()} Sarthi AI. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="hidden md:inline">Made with</span>
              <Heart className="h-4 w-4 text-red-400 hidden md:inline" />
              <span className="hidden md:inline">for job seekers worldwide</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link href="/sitemap" className="hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
              <Link href="/status" className="hover:text-green-400 transition-colors">
                Status
              </Link>
              <Link href="/api-docs" className="hover:text-purple-400 transition-colors">
                API
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
