'use client'

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import AdminPanel from '@/components/AdminPanel'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return null
  }

  return <AdminPanel />
}