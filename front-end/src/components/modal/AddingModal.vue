<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useExercisesStore } from '../../stores/exercises'

defineEmits(['modal'])

const store = useExercisesStore()
</script>

<template>
  <div class="flex justify-center">
    <div class="fixed top-0 left-0 w-full h-full bg-black/70 z-10" @click="$emit('modal')" />
    <div class="bg-white w-66 h-66 fixed z-20 p-10 rounded-2xl">
      <div class="flex flex-col h-full items-center">
        <h1 class="text-xl md:text-3xl font-bold mb-4 md:mb-10">
          Добавить:
        </h1>
        <Button class="mb-4 cursor-pointer hover:bg-gray-200" as-child>
          <RouterLink to="exercise-create">
            Упражнение
          </RouterLink>
        </Button>
        <Button
          class="cursor-pointer hover:bg-gray-200"
          as-child
          @click="store.components = 'trainings'"
        >
          <RouterLink to="training-create">
            Тренировку
          </RouterLink>
        </Button>
      </div>
    </div>
  </div>
</template>
