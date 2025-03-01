"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Loader2, User, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { user, updateProfile } = useAuth()
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || "")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen || !user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset messages
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      // Update profile
      const { error } = await updateProfile({ full_name: fullName })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess("Profile updated successfully!")
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close profile modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <div className="flex items-center justify-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-primary" />
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-center">Your Profile</h2>

              {error && (
                <motion.div
                  className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div
                  className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {success}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                    disabled
                  />
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>

                <div className="mb-6">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your full name"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition-colors flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Profile"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

