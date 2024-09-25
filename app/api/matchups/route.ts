import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"

export async function GET() {
  // Fetch matchups from your database
  const matchups = [/* Your matchup data */]
  return NextResponse.json(matchups)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  // Save new matchup to your database
  return NextResponse.json({ message: "Matchup created" }, { status: 201 })
}