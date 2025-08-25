import type { IUser } from '../models/IUser'
import { router } from '@/main'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { AuthResponse } from '../models/response/AuthResponse'
import { useCookies } from '@vueuse/integrations/useCookies'
import { API_URL } from '../http/api'
import AuthService from '../services/AuthService'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const userInfo = ref<{
    user: IUser
  }>({
    user: {} as IUser,
    // isAuth: false,
  })
  const isAuth = ref(false)
  const cookies = useCookies(['auth'], { doNotParse: false, autoUpdateDependencies: false })

  const registration = async (authObj: any) => {
    try {
      const response = await AuthService.registration(authObj.email, authObj.password, authObj.weight, authObj.height, authObj.experience, authObj.trainingGoal)
      console.log(response.data)
      Cookies.set('token', response.data.accessToken, { expires: 7 })
      userInfo.value = {
        user: response.data.user,
        isAuth: true,
      }
      router.replace('/')
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }
  const login = async (loginObj: any) => {
    try {
      const response = await AuthService.login(loginObj.email, loginObj.password)
      console.log(response.data)
      cookies.set('token', response.data.accessToken)
      userInfo.value = {
        user: response.data.user,
        isAuth: true,
      }
      isAuth.value = true
      router.replace('/')
    } catch (e: any) {
      alert(e.response.data.message)
    }
  }

  const logout =async () => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}api/auth/refresh`, {
        withCredentials: true
      })
      cookies.remove('token')
      userInfo.value = {
        user: {} as IUser
      }
      isAuth.value = false
      router.replace('/')
    } catch(e: any) {
      console.log(e.response?.data?.message);
      
    }
  }

  const checkAuth = async () => {
    try {
      const response = await AuthService.refresh()
      cookies.set('token', response.data.accessToken)
      userInfo.value = {
        user: response.data.user,
      }
      isAuth.value = true
      console.log(isAuth.value);
    } catch(e: any) {
      console.log(e.response?.data?.message)
    }
  }

  return { userInfo, isAuth, registration, login, logout, checkAuth }
})
