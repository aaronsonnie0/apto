import { BookOpen, Brain, FileQuestion } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "E-Learning Materials",
    description:
      "Access a vast library of interactive courses, videos, and resources tailored to your learning style and goals.",
  },
  {
    icon: Brain,
    title: "Smart Summaries",
    description:
      "Our AI generates concise summaries of complex topics, helping you grasp key concepts quickly and efficiently.",
  },
  {
    icon: FileQuestion,
    title: "Quiz Generator",
    description: "Create custom quizzes based on any content to test your knowledge and reinforce your learning.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Learning Features</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Aptora combines cutting-edge AI technology with proven educational methods to deliver an unparalleled
            learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

