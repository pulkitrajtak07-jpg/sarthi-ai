"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/loading-spinner"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Sparkles,
  Brain,
  Rocket,
  Zap,
  Shield,
  Globe,
  Users,
  TrendingUp,
  Award,
} from "lucide-react"

export default function HomePage() {
  const { user, loading } = useAuth()
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Show loading spinner while auth is loading or component is mounting
  if (!mounted || loading) {
    return <LoadingSpinner />
  }

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Analysis",
      description: "Get detailed feedback on your resume with our advanced AI technology",
      color: "blue",
      delay: 0.1,
    },
    {
      icon: <Rocket className="h-8 w-8 text-indigo-600" />,
      title: "Smart Resume Builder",
      description: "Create professional resumes with AI-generated content and templates",
      color: "indigo",
      delay: 0.2,
    },
    {
      icon: <Target className="h-8 w-8 text-emerald-600" />,
      title: "Job Matching",
      description: "Find the perfect job opportunities that match your skills and experience",
      color: "emerald",
      delay: 0.3,
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Upload Your Resume",
      description: "Simply upload your current resume in PDF or Word format",
      icon: <Zap className="h-6 w-6" />,
      delay: 0.1,
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our AI analyzes your resume and provides detailed feedback",
      icon: <Brain className="h-6 w-6" />,
      delay: 0.2,
    },
    {
      number: "03",
      title: "Apply with Confidence",
      description: "Use the insights to improve your resume and land your dream job",
      icon: <Award className="h-6 w-6" />,
      delay: 0.3,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "Sarthi AI helped me improve my resume and land my dream job at a top tech company!",
      rating: 5,
      company: "Google",
      delay: 0.1,
    },
    {
      name: "Michael Chen",
      role: "Marketing Manager",
      content: "The AI analysis was incredibly detailed and helped me identify areas I never considered.",
      rating: 5,
      company: "Microsoft",
      delay: 0.2,
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist",
      content: "The resume templates are modern and professional. Highly recommend!",
      rating: 5,
      company: "Meta",
      delay: 0.3,
    },
  ]

  const stats = [
    { number: "50K+", label: "Resumes Analyzed", icon: <Users className="h-6 w-6" />, delay: 0.1 },
    { number: "95%", label: "Success Rate", icon: <TrendingUp className="h-6 w-6" />, delay: 0.2 },
    { number: "24/7", label: "AI Support", icon: <Shield className="h-6 w-6" />, delay: 0.3 },
    { number: "150+", label: "Countries", icon: <Globe className="h-6 w-6" />, delay: 0.4 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4 min-h-screen flex items-center">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-indigo-50/50"
          style={{ y: y1, opacity }}
        />
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4">
                    <Sparkles className="h-4 w-4 mr-2" />
                    AI-Powered Resume Analysis
                  </Badge>
                </motion.div>

                <motion.h1
                  className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1 }}
                >
                  <span className="text-blue-600">Transform Your</span>
                  <br />
                  <motion.span
                    className="text-slate-800"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                  >
                    Career Journey
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-xl text-slate-600 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Leverage the power of AI to create, analyze, and optimize your resume. Get personalized feedback and
                  land your dream job with confidence.
                </motion.p>
              </div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                {user ? (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/register">
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Get Started Free
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/upload">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 bg-transparent"
                      >
                        Try Demo
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>

              <motion.div
                className="flex items-center space-x-8 text-sm text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                {[
                  { icon: <CheckCircle className="h-5 w-5 text-emerald-500" />, text: "Free to start" },
                  { icon: <CheckCircle className="h-5 w-5 text-emerald-500" />, text: "AI-powered" },
                  { icon: <CheckCircle className="h-5 w-5 text-emerald-500" />, text: "Instant results" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  >
                    {item.icon}
                    <span className="ml-2">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative"
              style={{ y: y2 }}
            >
              <motion.div
                className="relative bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-slate-200"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Brain className="h-16 w-16 text-blue-600 mx-auto" />
                    <h3 className="text-xl font-semibold text-slate-800">AI Resume Analysis</h3>
                    <p className="text-slate-600">Powered by advanced AI technology</p>
                  </div>
                </div>

                {/* Floating UI Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-white p-3 rounded-xl shadow-lg border border-slate-200"
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Target className="h-6 w-6 text-emerald-600" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                className="text-center"
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 mx-auto mb-4 text-blue-600 bg-blue-50 rounded-xl flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-slate-800 mb-2">{stat.number}</div>
                    <p className="text-slate-600">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">Powerful Features for Your Success</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI-powered platform provides everything you need to create, analyze, and optimize your resume for
              maximum impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: feature.delay,
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200 h-full hover:shadow-xl transition-all duration-500">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-${feature.color}-50`}>{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-slate-800">{feature.title}</h3>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-slate-50/50 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">How It Works</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Get started in just three simple steps and transform your resume with AI-powered insights.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100, scale: 0.5 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: step.delay,
                  type: "spring",
                  stiffness: 120,
                }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <motion.div
                  className="relative mb-6"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="bg-white/80 backdrop-blur-sm border-slate-200 p-8 rounded-3xl shadow-lg">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="text-6xl font-bold text-blue-600 mb-2">{step.number}</div>
                  </div>
                </motion.div>

                <h3 className="text-2xl font-semibold text-slate-800 mb-4">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: step.delay + 0.8, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">What Our Users Say</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join thousands of professionals who have transformed their careers with Sarthi AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: testimonial.delay,
                  type: "spring",
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="bg-white/80 backdrop-blur-sm border-slate-200 h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <p className="text-slate-600 italic leading-relaxed">"{testimonial.content}"</p>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{testimonial.name}</h4>
                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                        <p className="text-xs text-blue-600 font-medium">{testimonial.company}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">Ready to Transform Your Career?</h2>

            <p className="text-xl text-slate-600">
              Join thousands of professionals who have already improved their resumes with our AI-powered platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/upload">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-medium rounded-xl transition-all duration-300 bg-transparent"
                    >
                      Try Demo
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
