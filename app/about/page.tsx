import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const metadata: Metadata = {
  title: 'Contact GOAT Matchups | Get in Touch',
  description: 'Have questions or suggestions? Contact the GOAT Matchups team. We\'re here to help with all your iconic rivalry coloring page needs.',
  openGraph: {
    title: 'Contact GOAT Matchups | Get in Touch',
    description: 'Reach out to the GOAT Matchups team with your questions, suggestions, or feedback. We\'re excited to hear from you!',
    type: 'website',
    url: 'https://www.goatmatchups.com/contact',
    images: [
      {
        url: 'https://www.goatmatchups.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GOAT Matchups Contact',
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="mb-4">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </section>
        <form className="max-w-md space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name</label>
            <Input type="text" id="name" required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-1">Email</label>
            <Input type="email" id="email" required />
          </div>
          <div>
            <label htmlFor="message" className="block mb-1">Message</label>
            <Textarea id="message" rows={4} required />
          </div>
          <Button type="submit">Send Message</Button>
        </form>
      </main>
      <Footer />
    </>
  )
}