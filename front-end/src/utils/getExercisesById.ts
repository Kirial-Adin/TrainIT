import { useExercisesStore } from '../stores/exercises'
import { useRoute } from 'vue-router'

export default async function getExercisesById() {
    const route = useRoute()
    const store = useExercisesStore()
    const id = String(route.params.id)
    await store.getExercisesById(id)
}

