import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { del } from '@vercel/blob'

export async function DELETE(request: Request) {
  const { imageUrl } = await request.json()
  
  if (!imageUrl) {
    return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
  }

  try {
    // Delete the image from Vercel Blob storage
    await del(imageUrl)

    // Remove the image URL from your list of images
    const images = await kv.get('images') as string[] | null
    if (images) {
      const updatedImages = images.filter(img => img !== imageUrl)
      await kv.set('images', updatedImages)
    }

    // Optionally, update any matchups that were using this image
    const matchups = await kv.get('matchups') as any[] | null
    if (matchups) {
      const updatedMatchups = matchups.map(m => 
        m.image === imageUrl ? {...m, image: null} : m
      )
      await kv.set('matchups', updatedMatchups)
    }

    return NextResponse.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}