<script setup lang="ts">
import type { Training } from '@/models'
import { useRouter } from 'vue-router'
import { useTrainingSessionStore } from '../../stores/training-session'
import { useTrainingStore } from '../../stores/trainings'
import Card from '../cards/Card.vue'

interface Exercise {
  id: number
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

function navigateToDetail(id: number) {
  router.push({ name: 'exercise', params: { id } })
}

function navigateToEdit(id: number) {
  router.push({ name: 'exercise-edit', params: { id } })
}

function navigateToTraining(id: number) {
  startTraining(id)
  sessionStore.activateTraining = true
  setTimeout(() => {
    router.push({ name: 'trainId', params: { id } })
  }, 500)
  // sessionStore.startTraining(sessionStore.training)
}

function startTraining(id: number) {
  trainingStore.startTrainingById(id)
}
</script>

<template>
  <div
    v-auto-animate
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-10"
  >
    <Card
      v-for="item in exercises"
      :id="item.id"
      :key="item.id"
      :title="item.title"
      :complexity="item.complexity"
      :type="item.type"
      :equipment="item.equipment"
      :image-url="item.imageUrl"
      @navigate-to-detail="navigateToDetail(item.id)"
      @navigate-to-edit="navigateToEdit(item.id)"
      @navigate-to-training="navigateToTraining(item.id)"
      @start-training="startTraining(item.id)"
    />
  </div>
</template>
