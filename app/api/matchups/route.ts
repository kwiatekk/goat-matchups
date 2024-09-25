import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

interface Matchup {
  id: string;
  title: string;
  category: string;
  image: string;
  views: number;
  downloads: number;
}

export async function GET() {
  try {
    // Fetch matchups from your KV store
    const matchups: Matchup[] = await kv.get('matchups') || [];
    return NextResponse.json(matchups);
  } catch (error) {
    console.error('Error fetching matchups:', error);
    return NextResponse.json({ error: 'Failed to fetch matchups' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newMatchup: Matchup = {
      id: Date.now().toString(),
      title: data.title,
      category: data.category,
      image: data.image,
      views: 0,
      downloads: 0,
    };

    // Get existing matchups
    const existingMatchups: Matchup[] = await kv.get('matchups') || [];

    // Add new matchup
    const updatedMatchups = [...existingMatchups, newMatchup];

    // Save updated matchups
    await kv.set('matchups', updatedMatchups);

    return NextResponse.json(newMatchup, { status: 201 });
  } catch (error) {
    console.error('Error creating matchup:', error);
    return NextResponse.json({ error: 'Failed to create matchup' }, { status: 500 });
  }
}