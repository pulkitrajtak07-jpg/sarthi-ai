import { type NextRequest, NextResponse } from "next/server"
import { joobleService } from "@/lib/jooble-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { keywords, location, radius, salary, datecreatedfrom, page } = body

    if (!keywords) {
      return NextResponse.json({ error: "Keywords are required" }, { status: 400 })
    }

    const result = await joobleService.searchJobs({
      keywords,
      location,
      radius,
      salary,
      datecreatedfrom,
      page: page || 1,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Job search API error:", error)
    return NextResponse.json({ error: "Failed to search jobs" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const keywords = searchParams.get("keywords") || "software developer"
    const location = searchParams.get("location") || ""
    const page = Number.parseInt(searchParams.get("page") || "1")

    const result = await joobleService.searchJobs({
      keywords,
      location,
      page,
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Job search API error:", error)
    return NextResponse.json({ error: "Failed to search jobs" }, { status: 500 })
  }
}
