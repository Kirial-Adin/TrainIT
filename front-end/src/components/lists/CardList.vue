<script setup lang="ts">
import type { Training } from '@/models'
import { useRouter } from 'vue-router'
import { useTrainingSessionStore } from '../../stores/training-session'
import { useTrainingStore } from '../../stores/trainings'
import { onMounted } from 'vue'
import Card from '../cards/Card.vue'

interface Exercise {
  _id: string
  // id?: number
  title: string
  complexity: string
  type: string
  equipment: string
  imageUrl: string
}

const props = defineProps<{
  exercises: Exercise[] | Training[]
}>()
const sessionStore = useTrainingSessionStore()
const trainingStore = useTrainingStore()
const router = useRouter()

function navigateToDetail(id: string) {
  console.log('id', id)
  router.push({ name: 'exercise', params: { id } })
}

function navigateToEdit(id: string) {
  console.log('id', id)
  router.push({ name: 'exercise-edit', params: { id } })
}

function navigateToTraining(id: string) {
  startTraining(id)
  sessionStore.activateTraining = true
  setTimeout(() => {
    router.push({ name: 'trainId', params: { id } })
  }, 500)
  // sessionStore.startTraining(sessionStore.training)
}

function startTraining(id: string) {
  trainingStore.startTrainingById(id)
}

onMounted(() => {
  for (let item of props.exercises) {
    console.log('Ggg', item)
  }
})

</script>

<template>
  <div
    v-auto-animate
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-10"
  >
    <Card
      v-for="item of exercises"
      :id="item._id"
      :key="item._id"
      :title="item.title"
      :complexity="item.complexity"
      :type="item.type"
      :equipment="item.equipment"
      :image-url="item.imageUrl"
      @navigate-to-detail="navigateToDetail(item._id)"
      @navigate-to-edit="navigateToEdit(item._id)"
      @navigate-to-training="navigateToTraining(item._id)"
      @start-training="startTraining(item._id)"
    />
  </div>
</template>
