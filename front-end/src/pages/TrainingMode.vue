<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useExercisesStore } from '../stores/exercises'
import { useTrainingSessionStore } from '../stores/training-session'
import type { Exercise, TrainingExercise } from '@/models'
import { Button } from '@/components/ui/button'
import ChooseTraining from '../components/ChooseTraining.vue'

const exerciseStore = useExercisesStore()
const sessionStore = useTrainingSessionStore()
const isActive = computed(() => sessionStore.activateTraining)

const repetitions = ref(0)

const currentExercise = computed((): TrainingExercise | null => {
  if (!sessionStore.currentSession || !sessionStore.currentExercise) return null
  return sessionStore.currentExercise
})

const exercise = computed((): Exercise | null => {
  if (!currentExercise.value) return null
  return exerciseStore.getById(currentExercise.value.exerciseId)
})

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

function startTimer() {
  sessionStore.startTimer()
}

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

function skipRest() {
  sessionStore.stopTimer()
  sessionStore.timer = 0
  sessionStore.isResting = false
}

function adjustRestTime(seconds: number) {
  sessionStore.adjustRestTime(seconds)
}

function getTotalDuration(): number {
  if (!sessionStore.currentSession) return 0

  return sessionStore.currentSession.completedExercises.reduce((total, ex) => {
    return total + ex.duration + ex.restTime
  }, 0)
}

onUnmounted(() => {
  sessionStore.stopTimer()
})
</script>

<template>
  <div>
    <div class="max-w-4xl mx-auto px-4 custom-padding">
      <template v-if="!sessionStore.isSessionActive && !sessionStore.currentSession?.completed">
        <ChooseTraining />
      </template>

      <template v-else-if="sessionStore.currentSession && !sessionStore.activateTraining">
        <div v-if="currentExercise && exercise && !sessionStore.isResting" class="text-center">
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

            <h3 class="text-xl font-semibold mb-2">{{ exercise.title }}</h3>
            <p class="text-gray-600 mb-4">{{ exercise.recommendation }}</p>

            <div v-if="exercise.measurementType === 'time'" class="mb-4">
              <div class="text-4xl font-bold">{{ formatTime(sessionStore.timer) }}</div>
              <Button
                @click="startTimer"
                class="cursor-pointer mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                Запустить отсчёт
              </Button>
            </div>

            <div v-else class="mb-4">
              <input
                type="number"
                v-model.number="repetitions"
                class="w-24 p-2 border rounded text-center text-xl"
              />
              <div class="text-sm text-gray-500">Цель: {{ currentExercise.goal }}</div>
            </div>

            <div class="flex max-sm:flex-col justify-center gap-4">
              <Button
                @click="completeExercise"
                class="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                Завершить
              </Button>
              <Button
                @click="skipExercise"
                class="cursor-pointer bg-gray-500 text-white px-6 py-2 rounded-lg"
              >
                Пропустить
              </Button>
            </div>
          </div>
        </div>

        <div v-else-if="sessionStore.isResting" class="text-center">
          <h2 class="text-2xl font-bold mb-4">Время отдыха</h2>
          <div class="text-6xl font-bold mb-6">{{ formatTime(sessionStore.timer) }}</div>

          <div class="flex justify-center gap-4 mb-6">
            <Button
              @click="adjustRestTime(-10)"
              class="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded"
            >
              -10s
            </Button>
            <Button
              @click="adjustRestTime(10)"
              class="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded"
            >
              +10s
            </Button>
          </div>

          <Button
            @click="skipRest"
            class="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg"
          >
            Пропустить отдых
          </Button>
        </div>

        <div v-else class="text-center">
          <h2 class="text-2xl font-bold mb-6">Тренировака завершена!</h2>

          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h3 class="text-xl font-semibold mb-4">Статистика</h3>

            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="text-center">
                <div class="text-gray-600">Длительность</div>
                <div class="text-2xl font-bold">
                  {{ formatTime(getTotalDuration()) }}
                </div>
              </div>
              <div class="text-center">
                <div class="text-gray-600">Выполненных упражнений</div>
                <div class="text-2xl font-bold">
                  {{
                    sessionStore.currentSession.completedExercises.length -
                    sessionStore.currentSession.skippedExercises.length
                  }}
                </div>
              </div>
            </div>

            <div class="text-center mb-6">
              <div class="text-gray-600">Очков получено</div>
              <div class="text-4xl font-bold text-green-500">
                +{{ sessionStore.currentSession.totalPoints }}
              </div>
            </div>

            <Button @click="sessionStore.endTraining" class="cursor-pointer inline-block bg-blue-500 text-white px-6 py-2 rounded-lg" as-child>
              <router-link
                to="/"
              >
                Вернуться на главную
              </router-link>
            </Button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
