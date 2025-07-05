import type { Exercise } from '../models'
import axios from 'axios'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useExercisesStore } from './exercises'

export const useExercisesManagementStore = defineStore('exercises-management', () => {
  const dataStore = useExercisesStore()
  const { exercises } = storeToRefs(dataStore)
  const lastId = ref(0)
  const router = useRouter()
  const isAdded = ref(false)
  const measurementType = ref<'repeats' | 'time'>('repeats')
  const imageFile = ref<File | null>(null)
  const imagePreview = ref<string>('')

  const getLastId = () => {
    try {
      const maxId = Math.max(...exercises.value.map((item: Exercise) => item.id), 0)
      return (lastId.value = maxId)
    }
    catch (error) {
      console.log(error)
    }
  }

  const uploadImage = (exercise: Exercise, file: File) => {
    const imageUrl = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = exercise.imageUrl.split('/').pop() || file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(imageUrl)
  }

  const handleImageChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
      imageFile.value = target.files[0]
      imagePreview.value = URL.createObjectURL(target.files[0])
    }
  }

  const createExercise = async (exercise: Omit<Exercise, 'id'>, file?: File) => {
    try {
      const fileName = `${Date.now()}-${file.name}`
      const formData = new FormData()
      formData.append('file', file)

      await new Promise(resolve => setTimeout(resolve, 500))

      uploadImage(exercise, file)

      const newExercise = {
        id: lastId.value + 1,
        ...exercise,
        imageUrl: `/img/${fileName}`,
      }

      await axios.post('https://c1223b1bc21e6d23.mokky.dev/exercises', newExercise)
      lastId.value++
      return newExercise
    }
    catch (error) {
      console.error(error)
      throw error
    }
  }

  const updateExercise = async (exercise: Exercise, file: File | null) => {
    try {
      if (file) {
        uploadImage(exercise, file)
      }

      await axios.patch(`https://c1223b1bc21e6d23.mokky.dev/exercises/${exercise.id}`, exercise)
      router.push({ name: 'home' })
      return exercise
    }
    catch (error) {
      console.error(error)
      throw error
    }
  }

  const deleteExercise = async (id: number) => {
    try {
      await axios.delete(`https://c1223b1bc21e6d23.mokky.dev/exercises/${id}`)
      router.push({ name: 'home' })
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

  const toggleAdded = () => {
    isAdded.value === false ? (isAdded.value = true) : (isAdded.value = false)
  }

  return {
    exercises,
    lastId,
    isAdded,
    measurementType,
    imageFile,
    imagePreview,
    getLastId,
    uploadImage,
    handleImageChange,
    createExercise,
    updateExercise,
    deleteExercise,
    toggleAdded,
  }
})
