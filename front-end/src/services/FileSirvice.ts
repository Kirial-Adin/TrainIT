import { useCookies } from '@vueuse/integrations/useCookies'
import $api from '@/http/api'
const cookies = useCookies(['auth'], { doNotParse: false, autoUpdateDependencies: false })

export default class FileService {
  static async uploadPreview(file: any, exerciseId: string) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('exerciseId', exerciseId)
      const response = await $api.post('api/files/preview', formData)
      alert('Превью успешно загружено')
      return response.data
    } catch (e: any) {
      alert(e.response?.data?.message)
    }
  }
}
// {
//     headers: {
//       Authorization: `Bearer ${cookies.get('token')}`,
//     },
//   }