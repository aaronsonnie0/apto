export function Hero() {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 gradient-bg text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-fade-in">
              Revolutionize Your Learning with AI
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-lg opacity-90">
              Aptora uses advanced AI to personalize your learning experience, making education more efficient,
              engaging, and tailored to your needs.
            </p>
            <a
              href="#features"
              className="inline-block px-8 py-4 bg-white text-primary font-bold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              aria-label="Start learning with Aptora"
            >
              Start Learning
            </a>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/placeholder.svg?height=400&width=500"
              alt="AI-powered learning illustration"
              className="w-full max-w-lg rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </section>
  )
}

