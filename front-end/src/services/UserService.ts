import type { AxiosResponse } from 'axios'
import $api from '@/http/api'

export default class UserService {
  static getUserIdByToken(refreshToken: string) {
    return $api.get(`api/users/`, { headers: { Authorization: `Bearer ${refreshToken}` } })
  }
}
