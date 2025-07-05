import type { Exercise, TrainingSession, UserProfile } from '../models'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()
  const profile = ref<UserProfile>({
    weight: 0,
    height: 0,
    experience: 'Начинающий',
    trainingGoal: 'weightLoss',
    points: 0,
    character: {
      outfit: 'стандартный',
      accessories: [],
    },
  })

  const calculateGoal = (exercise: Exercise) => {
    const experienceMultiplier = {
      beginner: 0.8,
      intermediate: 1,
      advanced: 1.2,
    }[profile.value.experience]

    if (exercise?.measurementType === 'repeats') {
      return Math.round((exercise.repeats || 0) * experienceMultiplier)
    }
    else {
      return Math.round((exercise.time || 0) * experienceMultiplier)
    }
  }

  const addPoints = (points: number) => {
    profile.value.points += points
  }

  const calculateTrainingPoints = (session: TrainingSession): number => {
    const basePoints = 100
    const completionBonus = session.completedExercises.length * 10
    const timeBonus
      = Math.floor(session.completedExercises.reduce((acc, ex) => acc + ex.duration, 0) / 60) * 5

    return basePoints + completionBonus + timeBonus
  }

  const saveProfile = (stats: UserProfile) => {
    profile.value = {
      weight: stats.weight,
      height: stats.height,
      experience: stats.experience,
      trainingGoal: stats.trainingGoal,
      points: stats.points,
      character: {
        outfit: stats.character.outfit,
        accessories: [],
      },
    }
    router.push('/dashboard')
    return profile
  }

  return {
    profile,
    calculateGoal,
    addPoints,
    calculateTrainingPoints,
    saveProfile,
  }
})
