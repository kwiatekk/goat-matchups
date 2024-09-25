import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
        <p className="mb-4">
          Welcome to GOAT Matchups. By using our website, you agree to comply with and be bound by the following terms and conditions of use.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-2">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By accessing or using GOAT Matchups, you agree to be bound by these Terms of Use and all applicable laws and regulations.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-2">2. Use License</h2>
        <p className="mb-4">
          Permission is granted to temporarily download one copy of the materials on GOAT Matchups for personal, non-commercial transitory viewing only.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-2">3. Disclaimer</h2>
        <p className="mb-4">
          The materials on GOAT Matchups are provided on an 'as is' basis. GOAT Matchups makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
        </p>
        <h2 className="text-2xl font-bold mt-6 mb-2">4. Limitations</h2>
        <p className="mb-4">
          In no event shall GOAT Matchups or its suppliers be liable for any damages arising out of the use or inability to use the materials on GOAT Matchups.
        </p>
        <p>
          For any questions regarding these terms, please contact us.
        </p>
      </main>
      <Footer />
    </>
  )
}