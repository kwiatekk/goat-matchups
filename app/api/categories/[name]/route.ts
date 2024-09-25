import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  
  try {
    const matchups = await kv.get('matchups') as any[] | null
    if (!matchups) {
      return NextResponse.json({ error: 'No matchups found' }, { status: 404 })
    }
    
    const updatedMatchups = matchups.filter(m => m.id !== id)
    await kv.set('matchups', updatedMatchups)
    
    return NextResponse.json({ message: 'Matchup deleted successfully' })
  } catch (error) {
    console.error('Error deleting matchup:', error)
    return NextResponse.json({ error: 'Failed to delete matchup' }, { status: 500 })
  }
}
