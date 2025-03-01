import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Team } from "@/components/team"
import { Dashboard } from "@/components/dashboard"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Features />
      <Team />
      <Dashboard />
      <Footer />
    </main>
  )
}

