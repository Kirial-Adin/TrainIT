import type { Training, TrainingSession } from '../models'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTrainingSessionStore } from './training-session'
import $api from '../http/api'
import axios from 'axios'
import TrainingService from '@/services/TrainingService'


export const useTrainingStore = defineStore('trainings', () => {
  const trainings = ref<Training[]>([])
  const currentTraining = ref<TrainingSession | null>(null)
  const router = useRouter()
  const currentId = ref(0)
  const lastId = ref()

  const { currentSession, currentExerciseIndex } = storeToRefs(useTrainingSessionStore())

  const getTrainingLastId = () => {
    try {
      const maxId = trainings.value.length > 0 ? trainings.value[trainings.value.length - 1]._id : 0
      console.log(maxId)
      return (lastId.value = maxId)
    }
    catch (error) {
      console.log(error)
    }
  }

  const getTraining = async () => {
    try {
      // const response = await axios.get('https://c1223b1bc21e6d23.mokky.dev/training')
      const response = await $api.get<Training[]>('api/trainings')
      const data = response.data
      trainings.value = data.map((obj: object) => ({
        ...obj,
      }))
    }
    catch (error) {
      console.log(error)
    }
  }

   const startTrainingById = async (id: number | string) => {
    try {
      const response = await $api.get<Training>(`api/trainings/${id}`)
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
    }
    catch (error) {
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
    }
    catch (error) {
      console.error(error)
      throw error
    }
  }

  const saveTrainingHandler = async (training: Omit<Training, 'id'>, file: File) => {
    try {
      const fileName = file.name
      const formData = new FormData()
      formData.append('file', file)

      uploadTrainingImage(training, file)
      console.log(training,  training.title);
      
      const response = TrainingService.createTraining(training.title, training.complexity, training.description, training.exercises, training.type, `/img/${fileName}`, training.time, file)
      router.push({ name: 'home' })

    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const deleteTraining = async (id: string) => {
    try {
      await TrainingService.deleteTraining(id)
      router.push({ name: 'home' })
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

  return { trainings, currentId, currentTraining, getTrainingLastId, getTraining, startTrainingById, saveTraining, saveTrainingHandler, deleteTraining }
})
