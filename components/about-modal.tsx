"use client"

import { X } from "lucide-react"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 modal-overlay">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl modal-content max-h-[90vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Close about modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">About Aptora</h2>

          <div className="prose dark:prose-invert max-w-none">
            <p>
              Aptora is a revolutionary AI-powered e-learning platform designed to transform how people learn online.
              Our mission is to make education more accessible, personalized, and effective for learners of all
              backgrounds.
            </p>

            <h3>Our Vision</h3>
            <p>
              We envision a world where quality education is accessible to everyone, regardless of their location,
              background, or learning style. Aptora uses cutting-edge artificial intelligence to adapt to each learner's
              unique needs, creating a truly personalized educational experience.
            </p>

            <h3>How Aptora Works</h3>
            <p>
              Our platform analyzes your learning patterns, strengths, and areas for improvement to create a customized
              learning path. As you progress, Aptora continuously adapts to optimize your learning experience, ensuring
              you're always challenged but never overwhelmed.
            </p>

            <h3>Key Features</h3>
            <ul>
              <li>
                <strong>Personalized Learning Paths:</strong> Tailored content based on your goals and learning style.
              </li>
              <li>
                <strong>Smart Summaries:</strong> AI-generated summaries of complex topics for quick understanding.
              </li>
              <li>
                <strong>Interactive Quizzes:</strong> Dynamically generated assessments to reinforce learning.
              </li>
              <li>
                <strong>Progress Tracking:</strong> Detailed analytics to monitor your improvement over time.
              </li>
              <li>
                <strong>Learning Streak System:</strong> Gamified elements to keep you motivated and consistent.
              </li>
            </ul>

            <h3>Our Commitment</h3>
            <p>
              At Aptora, we're committed to continuous improvement. We regularly update our algorithms, content, and
              features based on the latest educational research and user feedback. Our goal is to create the most
              effective learning platform possible.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

