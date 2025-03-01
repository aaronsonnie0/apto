"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Loader2, Clock, Book, Lightbulb, ArrowRight } from "lucide-react"
import {
  generateSummary,
  generateQuiz,
  generateLearningMaterials,
  type Quiz,
  type Roadmap,
  type RoadmapItem,
} from "@/lib/gemini"

export function AILearning() {
  const [content, setContent] = useState("")
  const [topic, setTopic] = useState("")
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<{
    summary: string
    keyTakeaways: string[]
    relatedTopics: string[]
  } | null>(null)
  const [quiz, setQuiz] = useState<{
    topic: string
    difficulty: string
    questions: Quiz[]
    suggestedStudyMaterials: string[]
  } | null>(null)
  const [materials, setMaterials] = useState<{
    overview: string
    keyPoints: string[]
    examples: string[]
    exercises: string[]
    roadmap: Roadmap
  } | null>(null)

  const handleSummarize = async () => {
    if (!content) return
    setLoading(true)
    try {
      const result = await generateSummary(content)
      setSummary(result)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate summary")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateQuiz = async () => {
    if (!content) return
    setLoading(true)
    try {
      const result = await generateQuiz(content)
      setQuiz(result)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate quiz")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateMaterials = async () => {
    if (!topic) return
    setLoading(true)
    try {
      const result = await generateLearningMaterials(topic)
      setMaterials(result)
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to generate learning materials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">AI-Powered Learning Tools</h2>
        
        {/* Content Input for Summary and Quiz */}
        <Card className="p-4 space-y-4">
          <h3 className="text-xl font-semibold">Generate Summary & Quiz</h3>
          <Textarea
            placeholder="Enter your content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
          />
          <div className="flex space-x-4">
            <Button onClick={handleSummarize} disabled={loading || !content}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Summary
            </Button>
            <Button onClick={handleGenerateQuiz} disabled={loading || !content}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Generate Quiz
            </Button>
          </div>
        </Card>

        {/* Topic Input for Learning Materials */}
        <Card className="p-4 space-y-4">
          <h3 className="text-xl font-semibold">Generate Learning Materials & Roadmap</h3>
          <Input
            placeholder="Enter topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <Button onClick={handleGenerateMaterials} disabled={loading || !topic}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Generate Materials
          </Button>
        </Card>

        {/* Results Section */}
        {summary && (
          <Card className="p-4 space-y-4">
            <h3 className="text-xl font-semibold">Summary Analysis</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Summary</h4>
                <p className="whitespace-pre-wrap">{summary.summary}</p>
              </div>
              <div>
                <h4 className="font-medium">Key Takeaways</h4>
                <ul className="list-disc pl-6">
                  {summary.keyTakeaways.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-medium">Related Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {summary.relatedTopics.map((topic, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {quiz && (
          <Card className="p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Quiz: {quiz.topic}</h3>
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                {quiz.difficulty}
              </span>
            </div>
            <div className="space-y-6">
              {quiz.questions.map((q, i) => (
                <div key={i} className="space-y-2">
                  <p className="font-medium">
                    {i + 1}. {q.question}
                  </p>
                  <ul className="list-disc pl-6">
                    {q.options.map((option, j) => (
                      <li
                        key={j}
                        className={
                          option === q.correctAnswer
                            ? "text-green-600 font-medium"
                            : ""
                        }
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">Explanation:</span>{" "}
                    {q.explanation}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h4 className="font-medium">Suggested Study Materials</h4>
              <ul className="list-disc pl-6">
                {quiz.suggestedStudyMaterials.map((material, i) => (
                  <li key={i}>{material}</li>
                ))}
              </ul>
            </div>
          </Card>
        )}

        {materials && (
          <>
            <Card className="p-4 space-y-4">
              <h3 className="text-xl font-semibold">Learning Materials</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Overview</h4>
                  <p>{materials.overview}</p>
                </div>
                <div>
                  <h4 className="font-medium">Key Points</h4>
                  <ul className="list-disc pl-6">
                    {materials.keyPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Examples</h4>
                  <ul className="list-disc pl-6">
                    {materials.examples.map((example, i) => (
                      <li key={i}>{example}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Exercises</h4>
                  <ul className="list-disc pl-6">
                    {materials.exercises.map((exercise, i) => (
                      <li key={i}>{exercise}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Learning Roadmap</h3>
                <span className="text-sm text-gray-600">
                  Estimated Duration: {materials.roadmap.totalDuration}
                </span>
              </div>
              <p className="text-gray-600">{materials.roadmap.overview}</p>
              <div className="space-y-6">
                {materials.roadmap.steps.map((step, i) => (
                  <div key={i} className="border-l-2 border-primary pl-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm text-gray-600">
                        {step.timeEstimate}
                      </span>
                    </div>
                    <h4 className="font-medium">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                    {step.prerequisites && step.prerequisites.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-sm font-medium">Prerequisites:</span>
                        <ul className="list-disc pl-6 text-sm">
                          {step.prerequisites.map((prereq, j) => (
                            <li key={j}>{prereq}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {step.resources && (
                      <div className="space-y-1">
                        <span className="text-sm font-medium">Resources:</span>
                        <ul className="list-disc pl-6 text-sm">
                          {step.resources.map((resource, j) => (
                            <li key={j}>{resource}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {step.subTopics && step.subTopics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {step.subTopics.map((topic, j) => (
                          <span
                            key={j}
                            className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  )
} 