export interface Exercise {
  _id: string
  exerciseId?: string
  title: string
  repeats: number
  time: number
  complexity: string
  type: string
  equipment: string
  imageUrl?: string
  recommendation: string
  measurementType: string
}

export interface TrainingExercise {
  exerciseId: string
  value: number
  goal: number
  measurementType: string
}

export interface Training {
  _id: string
  title: string
  complexity: string
  type: string
  imageUrl: string
  description: string
  time: number
  completed: boolean
  exercises: TrainingExercise[]
}

export interface UserProfile {
  email?: string
  password?: string
  weight: number
  height: number
  experience: string
  trainingGoal: string
  points: number
  character: {
    outfit: string
    accessories: string[]
  }
}

export interface TrainingSession {
  trainingId: number
  startTime: Date
  endTime?: Date
  completedExercises: CompletedExercise[]
  skippedExercises: number[]
  totalPoints: number
  completed: boolean
}

export interface CompletedExercise {
  exerciseId: string
  actualValue: number
  duration: number
  restTime: number
  value?: number
  goal?: number
  measurementType?: string
}
