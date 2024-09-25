import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

interface Matchup {
    id: number;
    title: string;
    category: string;
    image: string;
    views: number;
    downloads: number;
}

export async function GET() {
    try {
        const matchups = await kv.get('matchups') as Matchup[] | null
        return NextResponse.json(matchups || [])
    } catch (error) {
        console.error('Error fetching matchups:', error)
        return NextResponse.json({ error: 'Failed to fetch matchups' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()
        const matchups = await kv.get('matchups') as Matchup[] | null
        const newMatchup: Matchup = { id: Date.now(), ...data, views: 0, downloads: 0 }
        await kv.set('matchups', matchups ? [...matchups, newMatchup] : [newMatchup])
        return NextResponse.json(newMatchup, { status: 201 })
    } catch (error) {
        console.error('Error creating matchup:', error)
        return NextResponse.json({ error: 'Failed to create matchup' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    const id = request.url.split('/').pop()
    try {
        const matchups = await kv.get('matchups') as Matchup[] | null
        if (!matchups) {
            return NextResponse.json({ error: 'No matchups found' }, { status: 404 })
        }
        const updatedMatchups = matchups.filter(m => m.id !== Number(id))
        await kv.set('matchups', updatedMatchups)
        return NextResponse.json({ message: 'Matchup deleted successfully' })
    } catch (error) {
        console.error('Error deleting matchup:', error)
        return NextResponse.json({ error: 'Failed to delete matchup' }, { status: 500 })
    }
}