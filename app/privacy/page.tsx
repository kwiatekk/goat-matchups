import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Use | GOAT Matchups',
  description: 'Read and understand the Terms of Use for GOAT Matchups. Learn about your rights and responsibilities when using our iconic rivalry coloring pages.',
  openGraph: {
    title: 'Terms of Use | GOAT Matchups',
    description: 'Before using GOAT Matchups, please read our Terms of Use to understand the rules and guidelines governing the use of our platform.',
    type: 'website',
    url: 'https://www.goatmatchups.com/terms',
    images: [
      {
        url: 'https://www.goatmatchups.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GOAT Matchups Terms of Use',
      },
    ],
  },
}

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Terms of Use</h1>
        <p className="mb-6">
          Welcome to GOAT Matchups. By using our website, you agree to comply with and be bound by the following terms and conditions of use.
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using GOAT Matchups, you agree to be bound by these Terms of Use and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our service.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
          <p className="mb-4">
            Permission is granted to temporarily download one copy of the materials on GOAT Matchups for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software contained on GOAT Matchups</li>
            <li>Remove any copyright or other proprietary notations from the materials</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Disclaimer</h2>
          <p className="mb-4">
            The materials on GOAT Matchups are provided on an 'as is' basis. GOAT Matchups makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Limitations</h2>
          <p className="mb-4">
            In no event shall GOAT Matchups or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GOAT Matchups, even if GOAT Matchups or a GOAT Matchups authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>
          <p>
            For any questions regarding these terms, please contact us at legal@goatmatchups.com.
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}