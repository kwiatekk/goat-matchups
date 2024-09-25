import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | GOAT Matchups',
  description: 'Learn about how GOAT Matchups collects, uses, and protects your personal information by reading our Privacy Policy.',
  openGraph: {
    title: 'Privacy Policy | GOAT Matchups',
    description: 'Understand how GOAT Matchups handles your data, including the collection, usage, and protection of personal information.',
    type: 'website',
    url: 'https://www.goatmatchups.com/policy',
    images: [
      {
        url: 'https://www.goatmatchups.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GOAT Matchups Privacy Policy',
      },
    ],
  },
}



export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          At GOAT Matchups, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our website, <a href="https://www.goatmatchups.com" className="text-blue-500 underline">goatmatchups.com</a>.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect the following types of information from users:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li><strong>Personal Information:</strong> This includes your name, email address, and any other details you provide when filling out forms on our site.</li>
          <li><strong>Usage Data:</strong> We collect information about how you interact with our website, such as pages viewed, time spent, and browser type.</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">
          The information we collect is used for the following purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To provide and improve our services</li>
          <li>To communicate with you, such as responding to inquiries or sending updates</li>
          <li>To analyze usage trends and improve the user experience on our website</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-2">3. Sharing of Information</h2>
        <p className="mb-4">
          We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent, except in the following circumstances:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential</li>
          <li>When required by law or to protect our rights or comply with a legal obligation</li>
        </ul>

        <h2 className="text-2xl font-bold mt-6 mb-2">4. Cookies</h2>
        <p className="mb-4">
          GOAT Matchups uses cookies to enhance your experience. Cookies are small files that a site or its service provider transfers to your device through your web browser that enables the site&apos;s or its service provider&apos;s systems to recognize your browser and capture and remember certain information. You may choose to disable cookies via your browser settings, but note that some features of our website may not function properly without them.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">5. Data Security</h2>
        <p className="mb-4">
          We take reasonable precautions to protect your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">6. Third-Party Links</h2>
        <p className="mb-4">
          Our website may contain links to third-party websites. These third-party sites have separate and independent privacy policies, and we have no responsibility or liability for the content or activities of these linked sites.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">7. Children's Privacy</h2>
        <p className="mb-4">
          GOAT Matchups is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we become aware that we have inadvertently received personal information from a child under 13, we will take steps to delete the information as soon as possible.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">8. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically for any updates.
        </p>

        <h2 className="text-2xl font-bold mt-6 mb-2">9. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at <a href="mailto:support@goatmatchups.com" className="text-blue-500 underline">support@goatmatchups.com</a>.
        </p>
      </main>
      <Footer />
    </>
  )
}
