import type { Exercise } from '../models'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import $api from '../http/api'

export const useExercisesStore = defineStore('exercises', () => {
  const exercises = ref<Exercise[]>([])
  const currentExercise = ref<Exercise>()
  const components = ref('exercises')

  const getExercises = async () => {
    try {
      // const response = await axios.get<Exercise[]>('https://c1223b1bc21e6d23.mokky.dev/exercises')
      const response = await $api.get<Exercise[]>('api/exercises')
      const data = response.data
      exercises.value = data.map((exercise: Exercise) => ({
        ...exercise,        
      }))
      console.log(exercises.value)
    }
    catch (error) {
      console.log(error)
    }
  }
  // const getExercisesById = async (id: number) => {
  //   try {
  //     const response = await axios.get(`https://c1223b1bc21e6d23.mokky.dev/exercises/${id}`)
  //     currentExercise.value = response.data
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }

  const getExercisesById = async (id: string) => {
    try {
      const response = await $api.get<Exercise>(`api/exercises/${id}`)
      currentExercise.value = response.data 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const getById = (id: string) => {
    return exercises.value.find(ex => ex._id === id)
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
