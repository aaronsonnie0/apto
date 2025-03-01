import { GoogleGenerativeAI } from "@google/generative-ai"

const geminiApiKey = process.env.GEMINI_API_KEY!
const genAI = new GoogleGenerativeAI(geminiApiKey)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export interface Quiz {
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
}

export interface RoadmapItem {
  title: string
  description: string
  timeEstimate: string
  resources: string[]
  prerequisites?: string[]
  subTopics?: string[]
}

export interface Roadmap {
  overview: string
  steps: RoadmapItem[]
  totalDuration: string
}

export async function generateRoadmap(topic: string): Promise<Roadmap> {
  try {
    const prompt = `Generate a detailed learning roadmap for ${topic}. 
    Format the response as a JSON object with:
    {
      "overview": "Brief overview of the learning path",
      "steps": [
        {
          "title": "Step title",
          "description": "Detailed description",
          "timeEstimate": "Estimated time to complete",
          "resources": ["Recommended resources"],
          "prerequisites": ["Required prerequisites"],
          "subTopics": ["Related subtopics to explore"]
        }
      ],
      "totalDuration": "Total estimated duration"
    }`

    const result = await model.generateContent(prompt)
    const response = await result.response
    return JSON.parse(response.text())
  } catch (error) {
    console.error("Error generating roadmap:", error)
    throw new Error("Failed to generate roadmap")
  }
}

export async function generateSummary(content: string): Promise<{
  summary: string
  keyTakeaways: string[]
  relatedTopics: string[]
}> {
  try {
    const prompt = `Analyze and summarize the following content. 
    Format the response as a JSON object with:
    {
      "summary": "Comprehensive summary",
      "keyTakeaways": ["Key points to remember"],
      "relatedTopics": ["Related topics for further exploration"]
    }
    Content:\n\n${content}`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    return JSON.parse(response.text())
  } catch (error) {
    console.error("Error generating summary:", error)
    throw new Error("Failed to generate summary")
  }
}

export async function generateQuiz(content: string, numQuestions: number = 5): Promise<{
  topic: string
  difficulty: string
  questions: Quiz[]
  suggestedStudyMaterials: string[]
}> {
  try {
    const prompt = `Generate a comprehensive quiz based on the following content. 
    Format the response as a JSON object with:
    {
      "topic": "Main topic of the quiz",
      "difficulty": "Estimated difficulty level",
      "questions": [
        {
          "question": "Question text",
          "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
          "correctAnswer": "Correct option",
          "explanation": "Detailed explanation"
        }
      ],
      "suggestedStudyMaterials": ["Recommended resources for further study"]
    }
    Number of questions: ${numQuestions}
    Content:\n\n${content}`
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    return JSON.parse(response.text())
  } catch (error) {
    console.error("Error generating quiz:", error)
    throw new Error("Failed to generate quiz")
  }
}

export async function generateLearningMaterials(topic: string): Promise<{
  overview: string
  keyPoints: string[]
  examples: string[]
  exercises: string[]
  roadmap: Roadmap
}> {
  try {
    const [materials, roadmap] = await Promise.all([
      model.generateContent(`Generate comprehensive E-Learning materials for: ${topic}. 
      Format as JSON: {
        "overview": "Topic overview",
        "keyPoints": ["Key concepts"],
        "examples": ["Practical examples"],
        "exercises": ["Practice exercises"]
      }`).then(r => JSON.parse(r.response.text())),
      generateRoadmap(topic)
    ])

    return { ...materials, roadmap }
  } catch (error) {
    console.error("Error generating learning materials:", error)
    throw new Error("Failed to generate learning materials")
  }
}

export async function generateCustomPrompt(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Error with custom prompt:", error)
    throw new Error("Failed to process custom prompt")
  }
} 