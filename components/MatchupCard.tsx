import Image from 'next/image'
import Link from 'next/link'
import { Download, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'

type MatchupCardProps = {
  matchup: {
    title: string
    category: string
    image: string
  }
}

export default function MatchupCard({ matchup }: MatchupCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <Image
        src={matchup.image}
        alt={`${matchup.title} coloring page`}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-800">{matchup.title}</h3>
        <Link
          href={`/category/${matchup.category.toLowerCase()}`}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors mb-4 inline-block font-medium underline"
        >
          {matchup.category}
        </Link>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => console.log(`Coloring ${matchup.title}`)}
            className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Color Now!
          </Button>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => console.log(`Downloading ${matchup.title}`)}
              aria-label={`Download ${matchup.title}`}
            >
              <Download size={20} className="text-blue-800" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => console.log(`Printing ${matchup.title}`)}
              aria-label={`Print ${matchup.title}`}
            >
              <Printer size={20} className="text-red-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}