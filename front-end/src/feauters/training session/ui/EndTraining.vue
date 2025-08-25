<script setup lang="ts">
import { useTrainingSessionStore } from '../../../stores/training-session'
import { Button } from '../../../components/ui/button'
import formatTime from '../../../utils/formatTime'

const sessionStore = useTrainingSessionStore()

function getTotalDuration(): number {
  if (!sessionStore.currentSession) return 0

  return sessionStore.currentSession.completedExercises.reduce((total, ex) => {
    return total + ex.duration + ex.restTime
  }, 0)
}

defineProps({
    id: String
})

</script>

<template>
  <div class="text-center">
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
          <h1 class="text-gray-600">Выполненных упражнений</h1>
          <div class="text-2xl font-bold">
            {{
              sessionStore.currentSession.completedExercises.length -
              sessionStore.currentSession.skippedExercises.length
            }}
          </div>
        </div>
      </div>

      <div class="text-center mb-6">
        <h1 class="text-gray-600">Очков получено</h1>
        <div class="text-4xl font-bold text-green-500">
          +{{ sessionStore.currentSession.totalPoints }}
        </div>
      </div>

      <Button
        class="cursor-pointer inline-block bg-blue-500 text-white px-6 py-2 rounded-lg"
        as-child
        @click="sessionStore.endTraining(id)"
      >
        <router-link to="/"> Вернуться на главную </router-link>
      </Button>
    </div>
  </div>
</template>
