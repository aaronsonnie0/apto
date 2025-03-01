"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useUser } from "@/app/providers"
import { X, Loader2, Github, Mail } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth()
  const { updateStreak } = useUser()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    // Reset error
    setError("")
    setIsLoading(true)

    try {
      // Call login function
      const { error } = await signIn(email, password)

      if (error) {
        setError(error.message)
        return
      }

      // Update streak
      updateStreak()

      // Close modal
      onClose()
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      // Note: The modal will be closed after the redirect and successful authentication
    } catch (err) {
      setError("Failed to sign in with Google")
      console.error(err)
    }
  }

  const handleGithubSignIn = async () => {
    try {
      await signInWithGithub()
      // Note: The modal will be closed after the redirect and successful authentication
    } catch (err) {
      setError("Failed to sign in with GitHub")
      console.error(err)
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
              aria-label="Close login modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Log In to Aptora</h2>

              {error && (
                <motion.div
                  className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                    disabled={isLoading}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
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
                      Logging in...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Log In with Email
                    </>
                  )}
                </button>
              </form>

              <div className="mt-4 relative flex items-center justify-center">
                <div className="border-t border-gray-300 dark:border-gray-700 absolute w-full"></div>
                <span className="bg-white dark:bg-gray-800 px-2 text-sm text-gray-500 relative">Or continue with</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={handleGoogleSignIn}
                  className="flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  onClick={handleGithubSignIn}
                  className="flex items-center justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  <Github className="w-5 h-5 mr-2" />
                  GitHub
                </button>
              </div>

              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot your password?
                </a>
              </div>

              <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <button onClick={onClose} className="text-primary hover:underline font-medium">
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

