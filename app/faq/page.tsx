import Navbar from "@/components/navbar"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertTriangle, FileText, Briefcase } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-slate-900 relative">
        <div className="absolute inset-0 cyber-bg"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 neon-text-cyan animate-neon-pulse">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about Sarthi AI and get expert resume tips
            </p>
          </div>

          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-800/50 border border-cyan-500/30">
              <TabsTrigger
                value="faq"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 text-gray-300"
              >
                Frequently Asked Questions
              </TabsTrigger>
              <TabsTrigger
                value="tips"
                className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-300 text-gray-300"
              >
                Resume Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq">
              <Card className="neon-card-blue backdrop-blur-lg">
                <CardHeader>
                  <CardTitle className="neon-text-cyan flex items-center text-xl">
                    <FileText className="h-5 w-5 mr-2" />
                    Common Questions
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Find answers to frequently asked questions about Sarthi AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-b border-gray-600">
                      <AccordionTrigger className="text-white hover:text-cyan-300 text-left">
                        What is Sarthi AI?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">
                        Sarthi AI is an AI-powered platform that helps job seekers create professional resumes, get
                        personalized feedback on their existing resumes, and find job opportunities that match their
                        skills and experience. Our tools use advanced AI to provide tailored recommendations and
                        insights.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border-b border-gray-600">
                      <AccordionTrigger className="text-white hover:text-cyan-300 text-left">
                        How does the resume analysis work?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">
                        Our resume analysis tool uses AI to evaluate your resume against industry standards and best
                        practices. It checks for formatting, content quality, keyword optimization, and ATS
                        compatibility. After analysis, you'll receive a detailed report with a score and specific
                        recommendations for improvement.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border-b border-gray-600">
                      <AccordionTrigger className="text-white hover:text-cyan-300 text-left">
                        Is my data secure?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">
                        Yes, we take data security very seriously. All uploaded resumes and personal information are
                        encrypted and stored securely. We do not share your information with third parties without your
                        consent. You can delete your data at any time from your account settings.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border-b border-gray-600">
                      <AccordionTrigger className="text-white hover:text-cyan-300 text-left">
                        How accurate is the job matching?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">
                        Our job matching algorithm analyzes your skills, experience, and preferences to find relevant
                        opportunities. The accuracy improves over time as you interact with the platform. We recommend
                        keeping your profile up-to-date for the best results. The system also considers factors like
                        location, salary expectations, and company culture.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border-b border-gray-600">
                      <AccordionTrigger className="text-white hover:text-cyan-300 text-left">
                        Can I download my resume in different formats?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">
                        Yes, you can download your resume in multiple formats including PDF, DOCX, and plain text. PDF
                        is recommended for most job applications as it preserves formatting across devices. DOCX is
                        useful if you need to make further edits, and plain text is ideal for copying into online
                        application forms.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6" className="border-b border-gray-600">
                      <AccordionTrigger className="text-white hover:text-cyan-300 text-left">
                        Is Sarthi AI free to use?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">
                        Sarthi AI offers both free and premium features. Basic resume building and analysis are
                        available for free. Premium features include advanced AI suggestions, unlimited resume versions,
                        priority support, and enhanced job matching. Check our pricing page for current subscription
                        options.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7" className="border-b border-gray-600">
                      <AccordionTrigger className="text-white hover:text-cyan-300 text-left">
                        How often are job listings updated?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">
                        Our job listings are updated multiple times daily to ensure you have access to the most current
                        opportunities. We aggregate listings from various sources including company career pages, job
                        boards, and direct employer submissions. You can set up alerts to be notified when new jobs
                        matching your criteria are added.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-8" className="border-b border-gray-600">
                      <AccordionTrigger className="text-white hover:text-cyan-300 text-left">
                        Can I create multiple resumes?
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed">
                        Yes, you can create multiple versions of your resume tailored to different job applications or
                        industries. This is a recommended practice as it allows you to highlight the most relevant
                        skills and experiences for each position. All versions are saved in your account for easy access
                        and editing.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips">
              <div className="space-y-6">
                <Card className="neon-card-green backdrop-blur-lg">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <FileText className="h-8 w-8 text-green-400" />
                    <div>
                      <CardTitle className="text-white">Resume Format & Structure</CardTitle>
                      <CardDescription className="text-gray-300">
                        Best practices for organizing your resume
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Keep it concise</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Limit your resume to 1-2 pages. Recruiters spend an average of just 6-7 seconds scanning a
                            resume initially.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Use a clean, professional design</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Choose a simple, readable font (Arial, Calibri, Helvetica) and maintain consistent
                            formatting throughout.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Include essential sections</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Contact information, professional summary, work experience, education, and skills are
                            must-haves.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Avoid common mistakes</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Don't include photos, personal information (age, marital status), or references on your
                            resume.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="neon-card-purple backdrop-blur-lg">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Briefcase className="h-8 w-8 text-purple-400" />
                    <div>
                      <CardTitle className="text-white">Work Experience</CardTitle>
                      <CardDescription className="text-gray-300">
                        How to effectively showcase your professional background
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Use the STAR method</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Structure your achievements using Situation, Task, Action, and Result to clearly demonstrate
                            your impact.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Quantify achievements</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Use numbers and percentages to demonstrate your impact (e.g., "Increased sales by 25%"
                            rather than "Increased sales").
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Use action verbs</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Start bullet points with strong action verbs like "Developed," "Implemented," "Led," or
                            "Achieved."
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Tailor to the job</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Customize your experience section for each application to highlight the most relevant skills
                            and achievements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="neon-card-cyan backdrop-blur-lg">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <CheckCircle className="h-8 w-8 text-cyan-400" />
                    <div>
                      <CardTitle className="text-white">ATS Optimization</CardTitle>
                      <CardDescription className="text-gray-300">
                        How to ensure your resume passes Applicant Tracking Systems
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Use relevant keywords</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Include industry-specific terms and skills from the job description to increase your match
                            rate.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Stick to standard formatting</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Avoid tables, headers/footers, and complex designs that ATS systems might not parse
                            correctly.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Use standard section headings</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Label sections with conventional titles like "Work Experience" rather than creative
                            alternatives.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-white">Save in the right format</h3>
                          <p className="text-gray-300 leading-relaxed">
                            Submit your resume as a PDF or DOCX file unless specifically instructed otherwise.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
