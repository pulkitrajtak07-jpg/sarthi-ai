"use client"

import { useState } from "react"
import SpaceLayout from "@/components/space-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    if (!name || !email || !message) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real implementation, you would send this data to your backend
      // For now, we'll simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setIsSubmitted(true)

      // Clear form
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")

      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon.",
      })
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error sending message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SpaceLayout>
      <div className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Contact Us</h1>
            <p className="text-gray-300 mt-2">Get in touch with our team for support or feedback</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="bg-space-light border-space-accent/20">
                <CardHeader>
                  <CardTitle className="text-white">Send a Message</CardTitle>
                  <CardDescription className="text-gray-400">
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="h-8 w-8 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-medium text-white">Message Sent!</h3>
                      <p className="text-gray-300 text-center max-w-md">
                        Thank you for reaching out. We've received your message and will respond shortly.
                      </p>
                      <Button
                        onClick={() => setIsSubmitted(false)}
                        className="mt-4 bg-space-accent text-black hover:bg-space-accent/90"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            Your Name *
                          </Label>
                          <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-space-dark border-space-accent/30 text-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-space-dark border-space-accent/30 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-white">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="bg-space-dark border-space-accent/30 text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">
                          Message *
                        </Label>
                        <Textarea
                          id="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={6}
                          className="bg-space-dark border-space-accent/30 text-white"
                        />
                      </div>

                      <Button
                        type="submit"
                        className="bg-space-accent text-black hover:bg-space-accent/90 w-full md:w-auto"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" /> Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="bg-space-light border-space-accent/20">
                <CardHeader>
                  <CardTitle className="text-white">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-space-accent mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-white">Email</h3>
                      <p className="text-gray-300">support@sarthiai.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MessageSquare className="h-5 w-5 text-space-accent mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-white">Live Chat</h3>
                      <p className="text-gray-300">Available Monday-Friday, 9am-5pm IST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-space-light border-space-accent/20 mt-6">
                <CardHeader>
                  <CardTitle className="text-white">FAQ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">
                    Before contacting us, you might find answers to your questions in our FAQ section.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-space-accent/30 text-space-accent hover:bg-space-accent/10"
                  >
                    <a href="/faq">View FAQ</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SpaceLayout>
  )
}
