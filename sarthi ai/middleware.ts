import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Completely disable middleware to prevent redirect loops
  console.log("Middleware disabled - allowing all requests")
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
