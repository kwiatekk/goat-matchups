import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About GOAT Matchups | Iconic Rivalry Coloring Pages',
  description: 'Discover the story behind GOAT Matchups, your ultimate destination for creative coloring pages featuring iconic rivalries from sports, pop culture, and more.',
  openGraph: {
    title: 'About GOAT Matchups | Iconic Rivalry Coloring Pages',
    description: 'Explore the world of iconic rivalries through creative coloring pages at GOAT Matchups. Learn about our mission and passion for bringing legendary face-offs to life.',
    type: 'website',
    url: 'https://www.goatmatchups.com/about',
    images: [
      {
        url: 'https://www.goatmatchups.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GOAT Matchups Logo',
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">About GOAT Matchups</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="mb-4">
            At GOAT Matchups, we&apos;re passionate about bringing iconic rivalries to life through the art of coloring.
            Our mission is to provide a fun and educational platform where users of all ages can explore fascinating
            comparisons from various fields.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <p className="mb-4">
            Whether you&apos;re a sports enthusiast, a pop culture aficionado, or simply love coloring, GOAT Matchups
            has something for everyone. Our diverse collection includes:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Legendary sports rivalries</li>
            <li>Iconic comic book face-offs</li>
            <li>Classic movie and TV showdowns</li>
            <li>Historical confrontations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Join the GOAT Matchups Community</h2>
          <p>
            Dive into our ever-growing collection and bring these legendary matchups to life with your unique color choices.
            Join our community of coloring enthusiasts and share your creations with the world!
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
