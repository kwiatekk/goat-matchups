'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import Link from 'next/link'
import MatchupCard from './MatchupCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { categories, allMatchups } from '@/lib/data'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [displayedMatchups, setDisplayedMatchups] = useState(6)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
    // Implement search functionality here
  }

  const loadMoreMatchups = () => {
    setDisplayedMatchups(prevCount => Math.min(prevCount + 6, allMatchups.length))
  }

  return (
    <>
      <section className="bg-gradient-to-r from-blue-800 via-white to-red-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
            Color Your Favorite Matchups!
          </h1>
          <p className="text-xl mb-8 text-black">
            Explore awesome rivalries from sports, cartoons, comics, and more!
          </p>
          <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
            <Input
              type="search"
              placeholder="Find cool matchups..."
              className="w-full py-3 px-4 pr-12 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <Search size={20} />
            </Button>
          </form>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">
            Awesome Matchups to Color!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allMatchups.slice(0, displayedMatchups).map((matchup) => (
              <MatchupCard key={matchup.title} matchup={matchup} />
            ))}
          </div>
          {displayedMatchups < allMatchups.length && (
            <div className="text-center mt-12">
              <Button
                onClick={loadMoreMatchups}
                className="bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Load More Matchups
              </Button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-800">Explore All Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="bg-white text-blue-800 px-4 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}