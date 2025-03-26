<script setup lang="ts">
import type { Training } from '@/models'
import { useTrainingStore } from '../stores/trainings'
import { useTrainingSessionStore } from '../stores/training-session'

const trainingStore = useTrainingStore()
const sessionStore = useTrainingSessionStore()

function startTraining(training: Training) {
  sessionStore.startTraining(training)
}

</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-4">Выберите тренировку</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="training in trainingStore.trainings"
        :key="training.id"
        class="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition"
        @click="startTraining(training)"
      >
        <h2 class="text-xl font-bold mb-2">{{ training.title }}</h2>
        <p class="text-gray-600">{{ training.exercises.length }} упражнений</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
