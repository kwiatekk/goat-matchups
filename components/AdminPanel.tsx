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
        }, []) \
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Overview</CardTitle>
                                        <CardDescription>Key statistics for your GOAT Matchups site</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <BarChart className="h-4 w-4 text-blue-500" />
                                                    <span className="text-sm font-medium">Total Views</span>
                                                </div>
                                                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <Download className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm font-medium">Total Downloads</span>
                                                </div>
                                                <p className="text-2xl font-bold">{totalDownloads.toLocaleString()}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <PieChart className="h-4 w-4 text-purple-500" />
                                                    <span className="text-sm font-medium">Total Matchups</span>
                                                </div>
                                                <p className="text-2xl font-bold">{matchups.length}</p>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center space-x-2">
                                                    <TrendingUp className="h-4 w-4 text-red-500" />
                                                    <span className="text-sm font-medium">Categories</span>
                                                </div>
                                                <p className="text-2xl font-bold">{categories.length}</p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Views & Downloads Over Time</CardTitle>
                                        <CardDescription>Monthly trend of views and downloads</CardDescription>
                                    </CardHeader>
                                    <CardContent className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={chartData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
                                                <Line type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                <Card></Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Top Performing Matchups</CardTitle>
                                        <CardDescription>Matchups with the highest views and downloads</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Matchup</TableHead>
                                                    <TableHead>Views</TableHead>
                                                    <TableHead>Downloads</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {matchups.sort((a, b) => b.views - a.views).slice(0, 5).map((matchup) => (
                                                    <TableRow key={matchup.id}>
                                                        <TableCell>{matchup.title}</TableCell>
                                                        <TableCell>{matchup.views.toLocaleString()}</TableCell>
                                                        <TableCell>{matchup.downloads.toLocaleString()}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Activity</CardTitle>
                                        <CardDescription>Latest updates and actions</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-4">
                                            {recentActivities.map((activity) => (
                                                <li key={activity.id} className="flex items-center space-x-2">
                                                    {activity.type === 'add' && <PlusCircle className="h-4 w-4 text-green-500" />}
                                                    {activity.type === 'update' && <Pencil className="h-4 w-4 text-blue-500" />}
                                                    {activity.type === 'delete' && <Trash2 className="h-4 w-4 text-red-500" />}
                                                    {activity.type === 'upload' && <Upload className="h-4 w-4 text-purple-500" />}
                                                    <span>{activity.description}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>
                        </TabsContent>

                        <TabsContent value="matchups">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manage Matchups</CardTitle>
                                    <CardDescription>Add, edit, or remove matchups</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="matchup-title">Matchup Title</Label>
                                                <Input id="matchup-title" {...register("title", { required: "Title is required" })} />
                                                {errors.title && <span>{errors.title.message}</span>}
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="matchup-category">Category</Label>
                                                <Select onValueChange={(value) => register("category").onChange({ target: { value } })}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map((category) => (
                                                            <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="matchup-description">Description</Label>
                                            <Textarea id="matchup-description" {...register("description")} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="matchup-image">Upload Image</Label>
                                            <Input id="matchup-image" type="file" accept="image/*" {...register("image")} />
                                        </div>
                                        <Button type="submit">{editingMatchup ? 'Update' : 'Add'} Matchup</Button>
                                        {editingMatchup && (
                                            <Button type="button" variant="outline" onClick={() => setEditingMatchup(null)}>
                                                Cancel Edit
                                            </Button>
                                        )}
                                    </form>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead>Views</TableHead>
                                                <TableHead>Downloads</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {matchups.map((matchup) => (
                                                <TableRow key={matchup.id}>
                                                    <TableCell>{matchup.title}</TableCell>
                                                    <TableCell>{matchup.category}</TableCell>
                                                    <TableCell>{matchup.views.toLocaleString()}</TableCell>
                                                    <TableCell>{matchup.downloads.toLocaleString()}</TableCell>
                                                    <TableCell>
                                                        <div className="flex space-x-2">
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setEditingMatchup(matchup)}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="outline" size="sm">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogHeader>
                                                                        <DialogTitle>Are you sure you want to delete this matchup?</DialogTitle>
                                                                        <DialogDescription>
                                                                            This action cannot be undone.
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div className="flex justify-end space-x-2 mt-4">
                                                                        <Button variant="outline" onClick={() => { }}>Cancel</Button>
                                                                        <Button variant="destructive" onClick={() => handleDeleteMatchup(matchup.id)}>
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="categories">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Manage Categories</CardTitle>
                                    <CardDescription>Add or remove categories</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleAddCategory} className="space-y-4 mb-8">
                                        <div className="space-y-2">
                                            <Label htmlFor="category-name">Category Name</Label>
                                            <Input id="category-name" name="category-name" placeholder="e.g., Science Fiction" />
                                        </div>
                                        <Button type="submit">Add Category</Button>
                                    </form>

                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Category Name</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {categories.map((category) => (
                                                <TableRow key={category}>
                                                    <TableCell>{category}</TableCell>
                                                    <TableCell>
                                                        <div className="flex space-x-2">
                                                            <Dialog>
                                                                <DialogTrigger asChild>
                                                                    <Button variant="outline" size="sm">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </DialogTrigger>
                                                                <DialogContent>
                                                                    <DialogHeader>
                                                                        <DialogTitle>Are you sure you want to delete this category?</DialogTitle>
                                                                        <DialogDescription>
                                                                            This action cannot be undone. All matchups in this category will be uncategorized.
                                                                        </DialogDescription>
                                                                    </DialogHeader>
                                                                    <div className="flex justify-end space-x-2 mt-4">
                                                                        <Button variant="outline" onClick={() => { }}>Cancel</Button>
                                                                        <Button variant="destructive" onClick={() => handleDeleteCategory(category)}>
                                                                            Delete
                                                                        </Button>
                                                                    </div>
                                                                </DialogContent>
                                                            </Dialog>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="images">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Image Management</CardTitle>
                                    <CardDescription>Upload and manage images for matchups</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">Drag and drop images here, or click to select files</p>
                                            <Input
                                                id="image-upload"
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                            <Button variant="outline" className="mt-4">
                                                <Label htmlFor="image-upload" className="cursor-pointer">Select Files</Label>
                                            </Button>
                                        </div>
                                        <p className="text-sm text-gray-500">Supported formats: JPG, PNG, GIF (max 5MB)</p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4 mt-8">
                                        {images.map((image, index) => (
                                            <div key={index} className="relative">
                                                <Image src={image} alt={`Uploaded image ${index + 1}`} width={200} height={200} objectFit="cover" />
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            className="absolute top-2 right-2"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>Are you sure you want to delete this image?</DialogTitle>
                                                            <DialogDescription>
                                                                This action cannot be undone. The image will be permanently removed from the server.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <div className="flex justify-end space-x-2 mt-4">
                                                            <Button variant="outline" onClick={() => { }}>Cancel</Button>
                                                            <Button variant="destructive" onClick={() => handleDeleteImage(image)}>
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </main>

                {showToast && (
                    <Toast>
                        {toastMessage}
                    </Toast>
                )}
            </div>
        )
    }