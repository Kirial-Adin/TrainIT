import type { UserProfile } from '@/models'

export interface IUser extends UserProfile {
  email: string
  id: string
  avatar: string
}
