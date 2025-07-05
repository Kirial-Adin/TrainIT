import type { Exercise } from '../models'
import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useExercisesStore = defineStore('exercises', () => {
  const exercises = ref<Exercise[]>([])
  const currentExercise = ref<Exercise | null>(null)
  const components = ref('exercises')

  const getExercises = async () => {
    try {
      const response = await axios.get<Exercise[]>('https://c1223b1bc21e6d23.mokky.dev/exercises')
      const data = response.data
      exercises.value = data.map((exercise: Exercise) => ({
        ...exercise,
      }))
    }
    catch (error) {
      console.log(error)
    }
  }
  const getExercisesById = async (id: number) => {
    try {
      const response = await axios.get(`https://c1223b1bc21e6d23.mokky.dev/exercises/${id}`)
      currentExercise.value = response.data
    }
    catch (error) {
      console.log(error)
    }
  }
  const getById = (id: number) => {
    return exercises.value.find(ex => ex.id === id)
  }
  const getExercisesByType = (type: string) => {
    return exercises.value.filter(exer => exer.type === type)
  }

  return {
    exercises,
    currentExercise,
    components,
    getExercises,
    getExercisesById,
    getById,
    getExercisesByType,
  }
})
