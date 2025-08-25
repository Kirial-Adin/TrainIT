<script setup lang="ts">
import { useTrainingSessionStore } from '../../../stores/training-session'
import { Button } from '../../../components/ui/button'
import formatTime from '../../../utils/formatTime'

const sessionStore = useTrainingSessionStore()

function adjustRestTime(seconds: number) {
    sessionStore.adjustRestTime(seconds)
}

function skipRest() {
  sessionStore.endRest()
}

</script>

<template>
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-4">Время отдыха</h2>
    <div class="text-6xl font-bold mb-6">
      {{ formatTime(sessionStore.restTime) }}
    </div>

    <div class="flex justify-center gap-4 mb-6">
      <Button
        class="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded"
        @click="adjustRestTime(-10)"
      >
        -10s
      </Button>
      <Button
        class="cursor-pointer bg-gray-500 text-white px-4 py-2 rounded"
        @click="adjustRestTime(10)"
      >
        +10s
      </Button>
    </div>

    <Button class="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg" @click="skipRest">
      Пропустить отдых
    </Button>
  </div>
</template>
