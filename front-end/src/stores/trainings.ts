import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import { useTrainingSessionStore } from './training-session'
import type { Training, TrainingSession } from '../models'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useTrainingStore = defineStore('trainings', () => {
  const trainings = ref<Training[]>([])
  const currentTraining = ref<TrainingSession | null>(null)
  const router = useRouter()
  const currentId = ref(0)
  const lastId = ref(0)

  const { currentSession, currentExerciseIndex } = storeToRefs(useTrainingSessionStore())

  const getTrainingLastId = () => {
    try {
      const maxId = Math.max(...trainings.value.map((item: Training) => item.id), 0)
      console.log(maxId)
      return (lastId.value = maxId)
    } catch (error) {
      console.log(error)
    }
  }

  const getTraining = async () => {
    try {
      const response = await axios.get('https://c1223b1bc21e6d23.mokky.dev/training')
      const data = response.data
      trainings.value = data.map((obj: object) => ({
        ...obj,
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const startTrainingById = async (id: number | string) => {
    try {
      const response = await axios.get(`https://c1223b1bc21e6d23.mokky.dev/training/${id}`)
      currentTraining.value = response.data
      currentId.value = response.data.id
      currentSession.value = {
        trainingId: response.data.id,
        startTime: new Date(),
        completed: response.data.completed,
        completedExercises: response.data.exercises.map((ex: any) => ({
          exerciseId: ex.exerciseId,
          actualValue: 0,
          duration: 0,
          restTime: 0,
        })),
        skippedExercises: [],
        totalPoints: 0,
      }
      currentExerciseIndex.value = 0
    } catch (error) {
      throw error
    }
  }


  const uploadTrainingImage = (training: Training, file: File) => {
    const imageUrl = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = training.imageUrl.split('/').pop() || file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(imageUrl)
  }

  const saveTraining = async (training: Omit<Training, 'id'>, file: File) => {
    try {
      const fileName = file.name
      const formData = new FormData()
      formData.append('file', file)

      uploadTrainingImage(training, file)

      const newTraining = {
        id: lastId.value + 1,
        ...training,
        imageUrl: `/img/${fileName}`,
      }

      const response = await axios.post('https://c1223b1bc21e6d23.mokky.dev/training', newTraining)
      trainings.value.push(response.data)
      router.push({ name: 'home' })
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const deleteTraining = async (id: number) => {
    try {
      await axios.delete(`https://c1223b1bc21e6d23.mokky.dev/training/${id}`)
      router.push({ name: 'home' })
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  return { trainings, currentId, currentTraining, getTrainingLastId, getTraining, startTrainingById, saveTraining, deleteTraining }
})
