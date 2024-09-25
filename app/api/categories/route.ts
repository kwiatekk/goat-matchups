import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
    try {
        const categories = await kv.get('categories') || []
        return NextResponse.json(categories)
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { name } = await request.json()
        const categories = await kv.get('categories') || []
        await kv.set('categories', [...categories, name])
        return NextResponse.json({ message: 'Category added successfully', category: name }, { status: 201 })
    } catch (error) {
        console.error('Error creating category:', error)
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }
}