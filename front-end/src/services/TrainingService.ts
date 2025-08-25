import type { AxiosResponse } from 'axios'
import type { Training, TrainingExercise } from '@/models'
import $api from '@/http/api'

export default class TrainingService {
    static async getTrainings(): Promise<AxiosResponse<Training[]>> {
        return $api.get<Training[]>('/api/trainings')
    }

    static async createTraining(title: string, complexity: string, description: string, exercises: TrainingExercise[], type: string, imageUrl: string, time?: number, file?: File): Promise<AxiosResponse<Training>> {
        console.log(title);
        
        return $api.post<Training>('api/trainings/create-training', { title, complexity, exercises, description, type, imageUrl, time, file })
    }

    static async deleteTraining(id: string): Promise<AxiosResponse<Training>> {
        return $api.delete<Training>(`api/trainings/${id}`)
    }

    static async patchTrainingById (id: string, completed: boolean): Promise<AxiosResponse<Training>> {
        return $api.patch<Training>(`api/trainings/${id}`, { completed })
    }
}

