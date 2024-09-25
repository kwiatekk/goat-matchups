import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
    try {
        const matchups = await kv.get('matchups') || []
        return NextResponse.json(matchups)
    } catch (error) {
        console.error('Error fetching matchups:', error)
        return NextResponse.json({ error: 'Failed to fetch matchups' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const matchups = await kv.get('matchups') || []
        const newMatchup = { id: Date.now(), ...data, views: 0, downloads: 0 }
        await kv.set('matchups', [...matchups, newMatchup])
        return NextResponse.json(newMatchup, { status: 201 })
    } catch (error) {
        console.error('Error creating matchup:', error)
        return NextResponse.json({ error: 'Failed to create matchup' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    const id = request.url.split('/').pop()
    try {
        const matchups = await kv.get('matchups') || []
        const updatedMatchups = matchups.filter((m: any) => m.id !== Number(id))
        await kv.set('matchups', updatedMatchups)
        return NextResponse.json({ message: 'Matchup deleted successfully' })
    } catch (error) {
        console.error('Error deleting matchup:', error)
        return NextResponse.json({ error: 'Failed to delete matchup' }, { status: 500 })
    }
}