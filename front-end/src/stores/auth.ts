import type { IUser } from '../models/IUser'
import { router } from '@/main'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import AuthService from '../services/AuthService'

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<{
    user: IUser
  }>({
    user: {} as IUser,
    // isAuth: false,
  })
  const isAuth = ref(false)
  const registration = async (email: string, password: string, weight: number, height: number, experience: string, trainingGoal: string) => {
    try {
      const response = await AuthService.registration(email, password, weight, height, experience, trainingGoal)
      console.log(response.data)
      localStorage.setItem('token', response.data.accessToken)
      userInfo.value = {
        user: response.data.user,
        isAuth: true,
      }
      router.replace('/')
    }
    catch (e: any) {
      alert(e.response.data.message)
    }
  }
  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password)
      console.log(response.data)
      localStorage.setItem('token', response.data.accessToken)
      userInfo.value = {
        user: response.data.user,
        isAuth: true,
      }
      router.replace('/')
    }
    catch (e: any) {
      alert(e.response.data.message)
    }
  }

  return { userInfo, isAuth, registration, login }
})
