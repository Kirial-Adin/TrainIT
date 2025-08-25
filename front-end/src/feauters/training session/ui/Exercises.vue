<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Exercise, TrainingExercise } from '../../../models'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { useExercisesStore } from '../../../stores/exercises'
import { useTrainingSessionStore } from '../../../stores/training-session'
import formatTime from '../../../utils/formatTime'

const exerciseStore = useExercisesStore()
const sessionStore = useTrainingSessionStore()
const exerciseActive = ref(false)
const repetitions = ref(0)

const currentExercise = computed((): TrainingExercise | null => {
  if (!sessionStore.currentSession || !sessionStore.currentExercise) return null
  return sessionStore.currentExercise
})

const exercise = computed((): Exercise | null => {
  if (!currentExercise.value) return null
  return exerciseStore.getById(currentExercise.value.exerciseId)
})

function completeExercise() {
  if (!exercise.value || !currentExercise.value) return

  if (exercise.value.measurementType === 'repeats') {
    sessionStore.completeExercise(repetitions.value)
    repetitions.value = 0
  } else {
    sessionStore.completeExercise(sessionStore.timer)
  }
}

function skipExercise() {
  sessionStore.skipExercise()
}

function startTimer() {
  sessionStore.startTimer()
  exerciseActive.value = !exerciseActive.value
}

function stopTimer() {
  sessionStore.stopTimer()
  exerciseActive.value = !exerciseActive.value
  completeExercise()
}
</script>

<template>
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-4">
      Упражнение {{ sessionStore.currentExerciseIndex + 1 }} из
      {{ sessionStore.currentSession.completedExercises.length }}
    </h2>

    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <img
        :src="exercise.imageUrl"
        :alt="exercise.title"
        class="w-full max-w-md mx-auto mb-4 rounded"
      />

      <h3 class="text-xl font-semibold mb-2">
        {{ exercise.title }}
      </h3>
      <p class="text-gray-600 mb-4">
        {{ exercise.recommendation }}
      </p>

      <div v-if="exercise.measurementType === 'time'" class="mb-4">
        <div class="text-4xl font-bold">
          {{ formatTime(sessionStore.timer) }}
        </div>
        <Button
          v-if="!exerciseActive"
          class="cursor-pointer mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
          @click="startTimer"
        >
          Запустить отсчёт
        </Button>
        <Button
          v-else
          class="cursor-pointer mt-4 bg-red-500 text-white px-6 py-2 rounded-lg"
          @click="stopTimer"
        >
          Остановить отсчёт
        </Button>
      </div>

      <div v-else class="flex flex-col items-center justify-center gap-4 mb-4">
        <Input
          v-model.number="repetitions"
          type="number"
          class="w-24 p-2 border rounded text-center text-xl"
        />
        <h1 class="text-sm text-gray-500">Цель: {{ currentExercise.goal }}</h1>
      </div>

      <div class="flex max-sm:flex-col justify-center gap-4">
        <Button
          class="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg"
          @click="completeExercise"
        >
          Завершить
        </Button>
        <Button
          class="cursor-pointer bg-gray-500 text-white px-6 py-2 rounded-lg"
          @click="skipExercise"
        >
          Пропустить
        </Button>
      </div>
    </div>
  </div>
</template>
