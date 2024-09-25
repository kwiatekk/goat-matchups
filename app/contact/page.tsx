import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-4">
          Have questions, suggestions, or just want to say hello? We&apos;d love to hear from you! 
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>
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
