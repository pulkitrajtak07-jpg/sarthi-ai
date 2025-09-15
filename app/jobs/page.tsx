"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Clock, ExternalLink, Briefcase } from "lucide-react"
import type { JoobleJob } from "@/lib/jooble-service"

export default function JobsPage() {
  const [jobs, setJobs] = useState<JoobleJob[]>([])
  const [loading, setLoading] = useState(false)
  const [searchKeywords, setSearchKeywords] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [salaryFilter, setSalaryFilter] = useState("")
  const [dateFilter, setDateFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    // Load initial jobs
    handleSearch("software developer", "", 1)
  }, [])

  const handleSearch = async (keywords?: string, location?: string, page?: number) => {
    const searchTerms = keywords || searchKeywords || "software developer"
    const searchLoc = location || searchLocation
    const searchPage = page || currentPage

    setLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch("/api/search-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: searchTerms,
          location: searchLoc,
          salary: salaryFilter,
          datecreatedfrom: dateFilter,
          page: searchPage,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to search jobs")
      }

      const data = await response.json()

      if (searchPage === 1) {
        setJobs(data.jobs)
      } else {
        setJobs((prev) => [...prev, ...data.jobs])
      }

      setTotalCount(data.totalCount)
      setCurrentPage(searchPage)
    } catch (error) {
      console.error("Job search error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    handleSearch(searchKeywords, searchLocation, 1)
  }

  const loadMoreJobs = () => {
    handleSearch(searchKeywords, searchLocation, currentPage + 1)
  }

  const formatSalary = (salary: string) => {
    if (!salary || salary === "Salary not specified") return "💰 Salary not specified"
    return `💰 ${salary}`
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now.getTime() - date.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays === 1) return "📅 1 day ago"
      if (diffDays < 7) return `📅 ${diffDays} days ago`
      if (diffDays < 30) return `📅 ${Math.ceil(diffDays / 7)} weeks ago`
      return `📅 ${Math.ceil(diffDays / 30)} months ago`
    } catch {
      return "📅 Recently posted"
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🔍 Find Your Dream Job</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover thousands of job opportunities powered by Jooble API ✨
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5" />🎯 Job Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    placeholder="💼 Job title, keywords, or company..."
                    value={searchKeywords}
                    onChange={(e) => setSearchKeywords(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Input
                    placeholder="📍 Location (city, state, or remote)..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={salaryFilter} onValueChange={setSalaryFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="💰 Salary Range" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="any">Any Salary</SelectItem>
                    <SelectItem value="50000">$50,000+</SelectItem>
                    <SelectItem value="75000">$75,000+</SelectItem>
                    <SelectItem value="100000">$100,000+</SelectItem>
                    <SelectItem value="150000">$150,000+</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="📅 Date Posted" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="1">Last 24 hours</SelectItem>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="30">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>

                <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Search className="h-4 w-4" />🚀 Search Jobs
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Summary */}
        {hasSearched && (
          <div className="mb-6">
            <p className="text-gray-300">
              📊 Found <span className="font-semibold text-white">{totalCount}</span> jobs
              {searchKeywords && (
                <span>
                  {" "}
                  for "<span className="font-semibold text-blue-400">{searchKeywords}</span>"
                </span>
              )}
              {searchLocation && (
                <span>
                  {" "}
                  in <span className="font-semibold text-green-400">{searchLocation}</span>
                </span>
              )}
            </p>
          </div>
        )}

        {/* Job Listings */}
        <div className="space-y-6">
          {jobs.map((job) => (
            <Card key={job.id} className="bg-gray-800 border-gray-700 hover:bg-gray-750 transition-colors">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition-colors">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-4 text-gray-300 mb-3">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDate(job.updated)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="bg-blue-600 text-white mb-2">
                      {job.type}
                    </Badge>
                    <p className="text-sm text-gray-400">{job.source}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 line-clamp-3">{job.snippet}</p>

                <div className="flex justify-between items-center">
                  <div className="text-green-400 font-medium">{formatSalary(job.salary)}</div>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                    <a href={job.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      🚀 Apply Now
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        {jobs.length > 0 && jobs.length < totalCount && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMoreJobs}
              disabled={loading}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-300"></div>
                  Loading more jobs...
                </div>
              ) : (
                "📈 Load More Jobs"
              )}
            </Button>
          </div>
        )}

        {/* No Results */}
        {hasSearched && jobs.length === 0 && !loading && (
          <Card className="bg-gray-800 border-gray-700 text-center py-12">
            <CardContent>
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Jobs Found</h3>
              <p className="text-gray-300 mb-4">Try adjusting your search criteria or keywords</p>
              <Button
                onClick={() => {
                  setSearchKeywords("")
                  setSearchLocation("")
                  setSalaryFilter("")
                  setDateFilter("")
                  handleSearch("software developer", "", 1)
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                🔄 Reset Search
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
