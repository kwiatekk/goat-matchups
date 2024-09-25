import { NextResponse } from 'next/server'

export async function GET() {
    // This is a mock implementation. In a real app, you'd fetch this data from your database.
    const analyticsData = [
        { name: 'Jan', views: 4000, downloads: 2400 },
        { name: 'Feb', views: 3000, downloads: 1398 },
        { name: 'Mar', views: 2000, downloads: 9800 },
        { name: 'Apr', views: 2780, downloads: 3908 },
        { name: 'May', views: 1890, downloads: 4800 },
        { name: 'Jun', views: 2390, downloads: 3800 },
        { name: 'Jul', views: 3490, downloads: 4300 },
    ]

    return NextResponse.json(analyticsData)
}