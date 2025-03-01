"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"
import { AuthProvider } from "@/contexts/auth-context"

type UserContextType = {
  streak: number
  completedLessons: number
  achievementPoints: number
  progressData: { day: string; progress: number }[]
  updateStreak: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [streak, setStreak] = useState(0)
  const [completedLessons, setCompletedLessons] = useState(0)
  const [achievementPoints, setAchievementPoints] = useState(0)
  const [progressData, setProgressData] = useState<{ day: string; progress: number }[]>([])

  // Initialize user data from localStorage
  useState(() => {
    if (typeof window !== "undefined") {
      const storedStreak = Number.parseInt(localStorage.getItem("streak") || "0")
      const storedCompletedLessons = Number.parseInt(localStorage.getItem("completedLessons") || "0")
      const storedAchievementPoints = Number.parseInt(localStorage.getItem("achievementPoints") || "0")
      const storedProgressData = JSON.parse(localStorage.getItem("progressData") || "[]")

      setStreak(storedStreak)
      setCompletedLessons(storedCompletedLessons)
      setAchievementPoints(storedAchievementPoints)
      setProgressData(storedProgressData)
    }
  })

  // Handle login and update streak
  const updateStreak = () => {
    const lastLoginDate = localStorage.getItem("lastLoginDate")
    const today = new Date().toDateString()

    if (lastLoginDate) {
      const lastDate = new Date(lastLoginDate)
      const currentDate = new Date(today)

      // Calculate the difference in days
      const timeDiff = currentDate.getTime() - lastDate.getTime()
      const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24))

      if (dayDiff === 1) {
        // User logged in on consecutive day
        const newStreak = streak + 1
        setStreak(newStreak)
        localStorage.setItem("streak", newStreak.toString())
      } else if (dayDiff > 1) {
        // User skipped a day, reset streak
        setStreak(1)
        localStorage.setItem("streak", "1")
      }
    } else {
      // First login
      setStreak(1)
      localStorage.setItem("streak", "1")
    }

    // Update last login date
    localStorage.setItem("lastLoginDate", today)

    // Set mock data for demonstration
    const newCompletedLessons = Math.floor(Math.random() * 10) + 5
    const newAchievementPoints = Math.floor(Math.random() * 500) + 100

    setCompletedLessons(newCompletedLessons)
    setAchievementPoints(newAchievementPoints)

    // Generate mock progress data
    const newProgressData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return {
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
        progress: Math.floor(Math.random() * 100),
      }
    })

    setProgressData(newProgressData)

    // Save to localStorage
    localStorage.setItem("completedLessons", newCompletedLessons.toString())
    localStorage.setItem("achievementPoints", newAchievementPoints.toString())
    localStorage.setItem("progressData", JSON.stringify(newProgressData))
  }

  return (
    <AuthProvider>
      <UserContext.Provider
        value={{
          streak,
          completedLessons,
          achievementPoints,
          progressData,
          updateStreak,
        }}
      >
        {children}
      </UserContext.Provider>
    </AuthProvider>
  )
}

