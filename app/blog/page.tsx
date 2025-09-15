import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const blogPosts = [
  {
    id: 1,
    title: "10 Resume Mistakes That Are Costing You Job Interviews",
    excerpt:
      "Learn about the common resume mistakes that recruiters hate and how to avoid them to increase your chances of landing interviews.",
    image: "/images/blog-1.png",
    date: "May 15, 2023",
    author: "Priya Patel",
    category: "Resume Tips",
    slug: "resume-mistakes",
  },
  {
    id: 2,
    title: "How to Optimize Your Resume for ATS Systems",
    excerpt:
      "Discover the secrets to creating an ATS-friendly resume that will get past the automated screening and into the hands of hiring managers.",
    image: "/images/blog-2.png",
    date: "April 28, 2023",
    author: "Rahul Sharma",
    category: "ATS Optimization",
    slug: "ats-optimization",
  },
  {
    id: 3,
    title: "The Power of AI in Modern Job Searching",
    excerpt:
      "Explore how artificial intelligence is transforming the job search process and how you can leverage it to find better opportunities.",
    image: "/images/blog-3.png",
    date: "April 10, 2023",
    author: "Arjun Mehta",
    category: "AI Technology",
    slug: "ai-job-search",
  },
  {
    id: 4,
    title: "5 Skills Every Job Seeker Needs in 2023",
    excerpt:
      "Stay ahead of the competition by developing these essential skills that employers are looking for in today's rapidly changing job market.",
    image: "/images/blog-4.png",
    date: "March 22, 2023",
    author: "Neha Gupta",
    category: "Career Development",
    slug: "essential-skills-2023",
  },
  {
    id: 5,
    title: "How to Craft a Compelling Cover Letter",
    excerpt:
      "Learn the art of writing cover letters that complement your resume and make a strong impression on potential employers.",
    image: "/images/blog-5.png",
    date: "March 5, 2023",
    author: "Priya Patel",
    category: "Job Application",
    slug: "cover-letter-tips",
  },
  {
    id: 6,
    title: "Networking Strategies for Remote Job Seekers",
    excerpt:
      "Discover effective networking techniques that can help you build professional relationships and find opportunities in a remote work environment.",
    image: "/images/blog-6.png",
    date: "February 18, 2023",
    author: "Rahul Sharma",
    category: "Networking",
    slug: "remote-networking",
  },
]

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          {/* Featured Post */}
          <div className="mb-16">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">Sarthi AI Blog</h1>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image src="/images/blog-featured.png" alt="Featured blog post" fill style={{ objectFit: "cover" }} />
                </div>
                <div className="md:w-1/2 p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">June 1, 2023</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">The Future of Resume Building: AI-Powered Personalization</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Discover how artificial intelligence is revolutionizing the way job seekers create resumes, offering
                    unprecedented levels of personalization and optimization for specific job opportunities.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-800 flex items-center justify-center mr-3">
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">RS</span>
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">Rahul Sharma</span>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/blog/ai-resume-future">Read More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02]"
              >
                <div className="relative h-48">
                  <Image src={post.image || "/placeholder.svg"} alt={post.title} fill style={{ objectFit: "cover" }} />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs font-semibold px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400 text-sm">By {post.author}</span>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/blog/${post.slug}`}>Read More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button
                variant="outline"
                className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
              >
                1
              </Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Get the latest career advice, resume tips, and job search strategies delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 flex-grow"
              />
              <Button className="bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
