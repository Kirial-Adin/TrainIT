<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTrainingSessionStore } from '../../stores/training-session'

const route = useRoute()
const sessionStore = useTrainingSessionStore()

const id = ref('')

onMounted(() => {
  id.value = route.params.id
})
</script>

<template>
  <div class="text-center">
    <h1 class="text-2xl font-bold mb-8">
      Тренировка завершена
    </h1>
    <div class="flex flex-col md:flex-row justify-center gap-4">
      <Button class="cursor-pointer bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition" @click="sessionStore.restartTraining(id)">
        Повторить
      </Button>
      <Button class="cursor-pointer bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition" as-child>
        <RouterLink to="/">
          На главную
        </RouterLink>
      </Button>
    </div>
  </div>
</template>
