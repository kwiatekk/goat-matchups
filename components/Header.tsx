'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@/components/ui/button'
import { categories } from '@/lib/data'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/goat-matchups-logo.png" alt="GOAT Matchups Logo" width={100} height={50} priority />
            <span className="text-2xl font-bold text-gray-900">GOAT Matchups</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="text-gray-600 hover:text-blue-800 transition-colors"
              >
                {category}
              </Link>
            ))}
            {session && (
              <Link href="/admin" className="text-gray-600 hover:text-blue-800 transition-colors">
                Admin
              </Link>
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {session ? (
              <Button onClick={() => signOut()}>Logout</Button>
            ) : (
              <Button onClick={() => signIn()}>Login</Button>
            )}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/category/${category.toLowerCase()}`}
                    className="block w-full text-left text-gray-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category}
                  </Link>
                </li>
              ))}
              {session && (
                <li>
                  <Link
                    href="/admin"
                    className="block w-full text-left text-gray-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md px-2 py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}