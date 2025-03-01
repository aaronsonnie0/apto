"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useUser } from "@/app/providers"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Award, BookOpen, Flame, Trophy, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

// Mock leaderboard data
const leaderboardData = [
  { name: "JaneDoe", points: 1250, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "AlexSmith", points: 980, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "SamJohnson", points: 875, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "TaylorWilson", points: 760, avatar: "/placeholder.svg?height=40&width=40" },
  { name: "JordanLee", points: 650, avatar: "/placeholder.svg?height=40&width=40" },
]

export function Dashboard() {
  const { user, isLoading: authLoading } = useAuth()
  const { streak, completedLessons, achievementPoints, progressData, updateStreak } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Update streak when user is authenticated
    if (user) {
      updateStreak()
    }
  }, [user, updateStreak]) // Added updateStreak to dependencies

  if (!mounted) {
    return null
  }

  return (
    <section id="dashboard" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Learning Dashboard</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Track your progress, maintain your learning streak, and see how you compare to other learners.
          </p>

          {authLoading ? (
            <div className="flex justify-center mt-6">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            !user && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <p className="mt-6 text-gray-600 dark:text-gray-400">
                  Please log in to view your personalized dashboard.
                </p>
              </motion.div>
            )
          )}
        </div>

        {user ? (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stats Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mr-4">
                  <Flame className="w-6 h-6 text-orange-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Learning Streak</p>
                  <p className="text-2xl font-bold">{streak} days</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-blue-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Completed Lessons</p>
                  <p className="text-2xl font-bold">{completedLessons}</p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 flex items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mr-4">
                  <Award className="w-6 h-6 text-purple-500" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Achievement Points</p>
                  <p className="text-2xl font-bold">{achievementPoints}</p>
                </div>
              </motion.div>

              {/* Progress Chart */}
              <motion.div
                className="md:col-span-3 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold mb-4">Learning Progress</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* Leaderboard */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <Trophy className="w-6 h-6 text-yellow-500 mr-2" aria-hidden="true" />
                <h3 className="text-xl font-bold">Leaderboard</h3>
              </div>

              <div className="space-y-4">
                {leaderboardData.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="w-6 text-gray-500 font-medium">{index + 1}</span>
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={`${user.name}'s avatar`}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="font-medium">{user.name}</span>
                    </div>
                    <span className="font-bold text-primary">{user.points}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 text-primary hover:text-primary/80 text-sm font-medium">
                View Full Leaderboard
              </button>
            </motion.div>
          </motion.div>
        ) : (
          !authLoading && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 text-center">
              <p className="text-lg mb-4">
                Log in to view your personalized dashboard and track your learning progress.
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}

