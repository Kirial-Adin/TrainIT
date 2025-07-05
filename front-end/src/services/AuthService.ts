import type { AxiosResponse } from 'axios'
import type { AuthResponse } from '../models/response/AuthResponse'
import $api from '@/http/api'

export default class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('api/auth/login', { email, password })
  }

  static async registration(email: string, password: string, weight: number, height: number, experience: string, trainingGoal: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('api/auth/registration', {
      email,
      password,
      weight,
      height,
      experience,
      trainingGoal,
    })
  }

  static async logout(): Promise<void> {
    return $api.post('api/auth/logout')
  }
}
