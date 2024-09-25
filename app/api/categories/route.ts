import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"

export async function GET() {
  // Fetch categories from your database
  const categories = ['Sports', 'Animals', 'Cartoons', 'Comics', 'Movies', 'History', 'Pop Culture']
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()
  // Save new category to your database
  return NextResponse.json({ message: "Category created" }, { status: 201 })
}