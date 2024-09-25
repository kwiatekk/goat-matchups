import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MatchupCard from './MatchupCard'
import { Button } from '@/components/ui/button'
import { allMatchups } from '@/lib/data'

type CategoryPageProps = {
  category: string
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const categoryMatchups = allMatchups.filter(matchup => 
    matchup.category.toLowerCase() === category.toLowerCase()
  )

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center mb-8">
          <Link href="/" passHref>
            <Button variant="link" className="flex items-center text-blue-800 hover:text-blue-900 transition-colors">
              <ArrowLeft size={24} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">
          {category.charAt(0).toUpperCase() + category.slice(1)} Matchups
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryMatchups.map((matchup) => (
            <MatchupCard key={matchup.title} matchup={matchup} />
          ))}
        </div>
      </div>
    </section>
  )
}