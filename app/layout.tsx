import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GOAT Matchups - Coloring Pages for Kids',
  description: 'Explore awesome rivalries from sports, cartoons, comics, and more!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50 font-sans`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}