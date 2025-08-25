import type { AxiosResponse } from 'axios'
import type { Exercise } from '@/models'
import $api from '@/http/api'

export default class ExercisesService {
    static async createExercise(title: string, complexity: string, recommendation: string, type: string, equipment: string, measurementType: string, imageUrl: string, repeats?: number, time?: number, file?: File): Promise<AxiosResponse<Exercise>> {
        return $api.post<Exercise>('api/exercises/create-exercise', { title, complexity, recommendation, type, equipment, measurementType, imageUrl, repeats, time, file })
    }

    static async deleteExercise(id: string): Promise<AxiosResponse<Exercise>> {
        return $api.delete<Exercise>(`api/exercises/${id}`)
    }

    static async patchExerciseById (id: string, title: string, complexity: string, recommendation: string, type: string, equipment: string, measurementType: string, repeats?: number, time?: number, file?: File): Promise<AxiosResponse<Exercise>> {
        return $api.patch<Exercise>(`api/exercises/${id}`, { title, complexity, recommendation, type, equipment, measurementType, repeats, time, file })
    }
}


