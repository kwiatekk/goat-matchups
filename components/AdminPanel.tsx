'use client'

import { useState } from 'react'
import Image from 'next/image'
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

const chartData = [
    { name: 'Jan', views: 4000, downloads: 2400 },
    { name: 'Feb', views: 3000, downloads: 1398 },
    { name: 'Mar', views: 2000, downloads: 9800 },
    { name: 'Apr', views: 2780, downloads: 3908 },
    { name: 'May', views: 1890, downloads: 4800 },
    { name: 'Jun', views: 2390, downloads: 3800 },
    { name: 'Jul', views: 3490, downloads: 4300 },
]

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [matchups, setMatchups] = useState([
        { id: 1, title: 'Messi vs Ronaldo', category: 'Sports', image: '/messi-ronaldo.jpg', views: 10000, downloads: 5000 },
        { id: 2, title: 'Lion vs Tiger', category: 'Animals', image: '/lion-tiger.jpg', views: 8000, downloads: 4000 },
        { id: 3, title: 'Batman vs Joker', category: 'Comics', image: '/batman-joker.jpg', views: 12000, downloads: 6000 },
        { id: 4, title: 'Pikachu vs Charizard', category: 'Cartoons', image: '/pikachu-charizard.jpg', views: 9000, downloads: 4500 },
    ])
    const [categories, setCategories] = useState(['Sports', 'Animals', 'Cartoons', 'Comics', 'Movies', 'History', 'Pop Culture'])

    const totalViews = matchups.reduce((sum, matchup) => sum + matchup.views, 0)
    const totalDownloads = matchups.reduce((sum, matchup) => sum + matchup.downloads, 0)

    const handleAddMatchup = (event: React.FormEvent) => {
        event.preventDefault()
        // Implement matchup addition logic here
        console.log('Adding new matchup')
    }

    const handleAddCategory = (event: React.FormEvent) => {
        event.preventDefault()
        // Implement category addition logic here
        console.log('Adding new category')
    }

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })
            const data = await response.json()

            if (response.ok) {
                console.log('Image uploaded successfully:', data.url)
                // Use this URL when creating or updating a matchup
            } else {
                console.error('Upload failed:', data.error)
            }
        } catch (error) {
            console.error('Upload error:', error)
        }
    }

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
                            <Button variant="ghost">Logout</Button>
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
                                        <li className="flex items-center space-x-2">
                                            <PlusCircle className="h-4 w-4 text-green-500" />
                                            <span>New matchup added: Superman vs Goku</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Pencil className="h-4 w-4 text-blue-500" />
                                            <span>Category updated: Superheroes</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Upload className="h-4 w-4 text-purple-500" />
                                            <span>New image uploaded for: Mario vs Sonic</span>
                                        </li>
                                        <li className="flex items-center space-x-2">
                                            <Trash2 className="h-4 w-4 text-red-500" />
                                            <span>Matchup deleted: Apples vs Oranges</span>
                                        </li>
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
                                <form onSubmit={handleAddMatchup} className="space-y-4 mb-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="matchup-title">Matchup Title</Label>
                                            <Input id="matchup-title" placeholder="e.g., Messi vs Ronaldo" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="matchup-category">Category</Label>
                                            <Select>
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
                                        <Textarea id="matchup-description" placeholder="Enter a brief description of the matchup" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="matchup-image">Upload Image</Label>
                                        <Input id="matchup-image" type="file" accept="image/*" onChange={handleImageUpload} />
                                    </div>
                                    <Button type="submit">Add Matchup</Button>
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
                                    <TableBody></TableBody>
                                    <TableBody>
                                        {matchups.map((matchup) => (
                                            <TableRow key={matchup.id}>
                                                <TableCell>{matchup.title}</TableCell>
                                                <TableCell>{matchup.category}</TableCell>
                                                <TableCell>{matchup.views.toLocaleString()}</TableCell>
                                                <TableCell>{matchup.downloads.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <div className="flex space-x-2">
                                                        <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                                                        <Button variant="outline" size="sm"><Trash2 className="h-4 w-4" /></Button>
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
                                        <Input id="category-name" placeholder="e.g., Science Fiction" />
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
                                                        <Button variant="outline" size="sm"><Pencil className="h-4 w-4" /></Button>
                                                        <Button variant="outline" size="sm"><Trash2 className="h-4 w-4" /></Button>
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
                                        <Input id="image-upload" type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                                        <Button variant="outline" className="mt-4">
                                            <Label htmlFor="image-upload" className="cursor-pointer">Select Files</Label>
                                        </Button>
                                    </div>
                                    <p className="text-sm text-gray-500">Supported formats: JPG, PNG, GIF (max 5MB)</p>
                                </div>
                                {/* Image gallery would go here */}
                                <p className="mt-8 text-center text-gray-600">No images uploaded yet</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}