"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { LoginModal } from "./login-modal"
import { SignupModal } from "./signup-modal"
import { AboutModal } from "./about-modal"
import { Loader2 } from "lucide-react"

export function Header() {
  const { user, isLoading, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [signupModalOpen, setSignupModalOpen] = useState(false)
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    await signOut()
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <a href="#" className="text-2xl md:text-3xl font-bold text-primary brand-font">
              Aptora
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#dashboard"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Go to dashboard"
              >
                Dashboard
              </a>
              <button
                onClick={() => setAboutModalOpen(true)}
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Learn about Aptora"
              >
                About
              </button>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                aria-label="Rate our platform"
              >
                Rate Us
              </a>

              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              ) : user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
                  aria-label="Log out of your account"
                >
                  Log Out
                </button>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setLoginModalOpen(true)}
                    className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors"
                    aria-label="Log in to your account"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => setSignupModalOpen(true)}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors"
                    aria-label="Sign up for an account"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden hamburger-menu ${isMenuOpen ? "open" : ""} flex flex-col justify-center items-center w-8 h-8`}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1.5 transition-transform"></span>
              <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 mb-1.5 transition-opacity"></span>
              <span className="block w-6 h-0.5 bg-gray-800 dark:bg-gray-200 transition-transform"></span>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`mobile-menu md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
            <nav className="flex flex-col space-y-4 mt-4 pb-4">
              <a
                href="#dashboard"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </a>
              <button
                onClick={() => {
                  setAboutModalOpen(true)
                  setIsMenuOpen(false)
                }}
                className="text-left text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
              >
                About
              </button>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Rate Us
              </a>

              {isLoading ? (
                <div className="flex items-center">
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                </div>
              ) : user ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors w-full text-left"
                >
                  Log Out
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => {
                      setLoginModalOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-colors w-full text-left"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setSignupModalOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md transition-colors w-full text-left"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Modals */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <SignupModal isOpen={signupModalOpen} onClose={() => setSignupModalOpen(false)} />
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
    </>
  )
}

