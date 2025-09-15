import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-800 to-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
          <div className="particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 neon-text-cyan animate-neon-pulse">About Sarthi AI</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize the job search process with AI-powered tools that help job seekers
              create outstanding resumes and find their dream jobs.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-slate-900 relative">
          <div className="absolute inset-0 cyber-bg"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 neon-text-blue">Our Story</h2>
                <div className="space-y-4 text-gray-200">
                  <p className="leading-relaxed">
                    Sarthi AI was founded in <span className="neon-text-cyan font-semibold">2025</span> by a team of AI
                    experts and career professionals who recognized the challenges job seekers face in today's
                    competitive market.
                  </p>
                  <p className="leading-relaxed">
                    We saw that many talented individuals were struggling to create resumes that would get past
                    Applicant Tracking Systems (ATS) and catch the attention of hiring managers.
                  </p>
                  <p className="leading-relaxed">
                    By combining cutting-edge AI technology with deep industry knowledge, we've created a platform that
                    empowers job seekers to present their best selves to potential employers.
                  </p>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-xl neon-card-blue floating">
                  <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=320&fit=crop&crop=center"
                    alt="Sarthi AI Story - Team collaboration and innovation"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 bg-slate-800 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6 neon-text-purple">Our Mission</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12 leading-relaxed">
              To democratize career advancement by providing AI-powered tools that level the playing field for all job
              seekers, regardless of their background or experience level.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="neon-card-blue p-8 rounded-lg shadow-md floating-slow">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 neon-border-blue">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Accessibility</h3>
                <p className="text-gray-300 leading-relaxed">
                  Make professional career tools accessible to everyone, breaking down barriers to employment.
                </p>
              </div>

              <div className="neon-card-purple p-8 rounded-lg shadow-md floating">
                <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 neon-border-purple">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-purple-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Innovation</h3>
                <p className="text-gray-300 leading-relaxed">
                  Continuously improve our AI technology to provide the most effective job search tools available.
                </p>
              </div>

              <div className="neon-card-cyan p-8 rounded-lg shadow-md floating-fast">
                <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 neon-border-cyan">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-cyan-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Empowerment</h3>
                <p className="text-gray-300 leading-relaxed">
                  Empower job seekers with the knowledge and tools they need to take control of their career journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Founder */}
        <section className="py-16 bg-slate-900 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-purple-900/10 to-cyan-900/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center neon-text-green">Meet Our Founder</h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
              Visionary leader passionate about helping people succeed in their careers through innovative AI
              technology.
            </p>

            <div className="flex justify-center">
              <div className="text-center max-w-sm">
                <div className="relative h-64 w-64 mx-auto mb-6 rounded-lg overflow-hidden neon-card-green floating">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=256&h=256&fit=crop&crop=face"
                    alt="Pulkit Raj Tak - CEO & Founder of Sarthi AI"
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-2">Pulkit Raj Tak</h3>
                <p className="neon-text-green text-lg font-medium mb-4">CEO & Founder</p>
                <p className="text-gray-300 leading-relaxed">
                  Passionate about leveraging AI to transform the job search experience and help individuals achieve
                  their career goals. With a vision to democratize career advancement through technology.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-white animate-bounce-in">
              Ready to Transform Your Job Search?
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join thousands of job seekers who have already used Sarthi AI to land their dream jobs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="neon-button-cyan text-black font-semibold">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
