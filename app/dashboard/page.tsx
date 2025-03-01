"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Header } from "@/components/header"
import { Dashboard } from "@/components/dashboard"
import { Footer } from "@/components/footer"
import { Loader2 } from "lucide-react"
import { AILearning } from "@/components/ai-learning"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="mt-4 text-gray-600">Loading your dashboard...</p>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-16">
        <Dashboard />
        <AILearning />
      </div>
      <Footer />
    </main>
  )
}

