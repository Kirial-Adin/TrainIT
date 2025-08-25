import { defineStore } from 'pinia'
import { ref } from 'vue'
import FileService from '@/services/FileSirvice'


export const useFileStore = defineStore('files', () => {
    const uploadPreview = async (file: File, exerciseId: string) => {
        try {
            const response = await FileService.uploadPreview(file, exerciseId)
            console.log(response)
        } catch (err) {
            throw err
        }
    }

    return {uploadPreview}
})

