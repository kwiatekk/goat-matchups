'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Pencil, Trash2, Upload, BarChart, PieChart, TrendingUp, Download } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useForm, SubmitHandler } from "react-hook-form"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Toast } from "@/components/ui/toast"
import { useSession, signOut } from "next-auth/react"

interface Matchup {
    id: number;
    title: string;
    category: string;
    image: string;
    views: number;
    downloads: number;
    description: string;
}

interface MatchupFormInputs {
    title: string;
    category: string;
    description: string;
    image: FileList;
}

interface ChartDataPoint {
    name: string;
    views: number;
    downloads: number;
}

interface Activity {
    id: number;
    type: 'add' | 'update' | 'delete' | 'upload';
    description: string;
    timestamp: string;
}

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [matchups, setMatchups] = useState<Matchup[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [chartData, setChartData] = useState<ChartDataPoint[]>([])
    const [recentActivities, setRecentActivities] = useState<Activity[]>([])
    const [images, setImages] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')
    const [itemToDelete, setItemToDelete] = useState<number | null>(null)
    const [editingMatchup, setEditingMatchup] = useState<Matchup | null>(null)

    const router = useRouter()
    const { status } = useSession()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<MatchupFormInputs>()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const [matchupsRes, categoriesRes, chartDataRes, activitiesRes, imagesRes] = await Promise.all([
                    fetch('/api/matchups'),
                    fetch('/api/categories'),
                    fetch('/api/analytics'),
                    fetch('/api/activities'),
                    fetch('/api/images')
                ])
                if (!matchupsRes.ok || !categoriesRes.ok || !chartDataRes.ok || !activitiesRes.ok || !imagesRes.ok)
                    throw new Error('Failed to fetch data')
                const matchupsData = await matchupsRes.json()
                const categoriesData = await categoriesRes.json()
                const chartData = await chartDataRes.json()
                const activitiesData = await activitiesRes.json()
                const imagesData = await imagesRes.json()
                setMatchups(matchupsData)
                setCategories(categoriesData)
                setChartData(chartData)
                setRecentActivities(activitiesData)
                setImages(imagesData)
            } catch (err) {
                setError('Failed to load data. Please try again.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleAddCategory = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const name = formData.get('categoryName') as string
        if (!name) return

        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            })
            if (!response.ok) throw new Error('Failed to add category')
            const newCategory = await response.json()
            setCategories([...categories, newCategory.category])
            setToastMessage('Category added successfully')
            setShowToast(true)
        } catch (error) {
            console.error('Error adding category:', error)
            setToastMessage('Failed to add category')
            setShowToast(true)
        }
    }

    const handleDeleteCategory = async (category: string) => {
        try {
            const response = await fetch(`/api/categories/${encodeURIComponent(category)}`, {
                method: 'DELETE'
            })
            if (!response.ok) throw new Error('Failed to delete category')
            setCategories(categories.filter(c => c !== category))
            setToastMessage('Category deleted successfully')
            setShowToast(true)
        } catch (error) {
            console.error('Error deleting category:', error)
            setToastMessage('Failed to delete category')
            setShowToast(true)
        }
    }

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/images', {
                method: 'POST',
                body: formData
            })
            if (!response.ok) throw new Error('Failed to upload image')
            const newImage = await response.json()
            setImages([...images, newImage.url])
            setToastMessage('Image uploaded successfully')
            setShowToast(true)
        } catch (error) {
            console.error('Error uploading image:', error)
            setToastMessage('Failed to upload image')
            setShowToast(true)
        }
    }

    const handleDeleteImage = async (image: string) => {
        try {
            const response = await fetch('/api/images', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ imageUrl: image })
            })
            if (!response.ok) throw new Error('Failed to delete image')
            setImages(images.filter(img => img !== image))
            setToastMessage('Image deleted successfully')
            setShowToast(true)
        } catch (error) {
            console.error('Error deleting image:', error)
            setToastMessage('Failed to delete image')
            setShowToast(true)
        }
    }

    const handleDeleteMatchup = async (id: number) => {
        try {
            const response = await fetch(`/api/matchups/${id}`, {
                method: 'DELETE'
            })
            if (!response.ok) throw new Error('Failed to delete matchup')
            setMatchups(matchups.filter(m => m.id !== id))
            setToastMessage('Matchup deleted successfully')
            setShowToast(true)
        } catch (error) {
            console.error('Error deleting matchup:', error)
            setToastMessage('Failed to delete matchup')
            setShowToast(true)
        }
    }

    const onSubmit: SubmitHandler<MatchupFormInputs> = async (data) => {
        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('category', data.category)
        formData.append('description', data.description)
        if (data.image[0]) formData.append('image', data.image[0])

        try {
            const url = editingMatchup ? `/api/matchups/${editingMatchup.id}` : '/api/matchups'
            const method = editingMatchup ? 'PUT' : 'POST'
            const response = await fetch(url, { method, body: formData })
            if (!response.ok) throw new Error('Failed to save matchup')
            const savedMatchup = await response.json()
            
            if (editingMatchup) {
                setMatchups(matchups.map(m => m.id === savedMatchup.id ? savedMatchup : m))
                setEditingMatchup(null)
            } else {
                setMatchups([...matchups, savedMatchup])
            }
            
            reset()
            setToastMessage(`Matchup ${editingMatchup ? 'updated' : 'added'} successfully`)
            setShowToast(true)
        } catch (error) {
            console.error('Error saving matchup:', error)
            setToastMessage('Failed to save matchup')
            setShowToast(true)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    const totalViews = matchups.reduce((sum, matchup) => sum + matchup.views, 0)
    const totalDownloads = matchups.reduce((sum, matchup) => sum + matchup.downloads, 0)

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Image src="/goat-matchups-logo.png" alt="GOAT Matchups Logo" width={50} height={50} />
                            <span className="text-2xl font-bold text-gray-900">Admin Panel</span>
                        </div>
                        <nav>
                            <Button variant="ghost" onClick={() => signOut()}>Logout</Button>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="matchups">Matchups</TabsTrigger>
                        <TabsTrigger value="categories">Categories</TabsTrigger>
                        <TabsTrigger value="images">Images</TabsTrigger>
                    </TabsList>

                    <TabsContent value="dashboard">
                        {/* Dashboard content */}
                    </TabsContent>

                    <TabsContent value="matchups">
                        {/* Matchups content */}
                    </TabsContent>

                    <TabsContent value="categories">
                        {/* Categories content */}
                    </TabsContent>

                    <TabsContent value="images">
                        {/* Images content */}
                    </TabsContent>
                </Tabs>
            </main>

            {showToast && (
                <Toast
                    message={toastMessage}
                    onClose={() => setShowToast(false)}
                />
            )}
        </div>
    )
}