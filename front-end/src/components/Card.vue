<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { useExercisesManagementStore } from '../stores/exercises-management'
import { useExercisesStore } from '../stores/exercises'
import { useTrainingStore } from '../stores/trainings'

const props = defineProps<{
  id: number
  title: string
  complexity: string
  type: string
  equipment: string
  imageUrl: string
}>()

const managementStore = useExercisesManagementStore()
const exerciseStore = useExercisesStore()
const trainingStore = useTrainingStore()

const components = computed(() => exerciseStore.components)

const deleteFunc = async () => {
  if (components.value === 'exercises') {
    await managementStore.deleteExercise(props.id)
  } else {
    await trainingStore.deleteTraining(props.id)
  }
}
const emit = defineEmits(['navigateToDetail', 'navigateToEdit', 'navigateToTraining'])

const handleNavigation = () => {
  components.value === 'exercises' ? emit('navigateToDetail') : emit('navigateToTraining')
}
</script>

<template>
  <div
    class="relative ml-3 mr-3 bg-white border border-slate-100 rounded-3xl p-4 md:p-6 lg:p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
  >
    <div @click="handleNavigation" class="">
      <img :src="imageUrl" alt="Картинка" class="w-full h-auto" />
      <p role="paragraph" class="mt-2 text-sm md:text-base">{{ title }}</p>
      <div class="flex justify-between mt-3 md:mt-5">
        <div class="flex flex-col">
          <b class="text-sm md:text-base">{{ complexity }}</b>
          <h1 class="text-sm md:text-base">{{ type }}</h1>
          <p class="text-slate-500 text-sm md:text-base">{{ equipment }}</p>
        </div>
      </div>

      <div v-show="components === 'exercises'" class="flex flex-row gap-2">
        <Button @click="emit('navigateToEdit')" class="cursor-pointer"> ✏ </Button>
        <Button @click="deleteFunc" class="cursor-pointer">🗑</Button>
      </div>
      <div v-show="components === 'trainings'" class="flex flex-row gap-2 py-2">
        <Button class="cursor-pointer" @click="emit('navigateToTraining')">
          Заниматься
        </Button>
        <Button @click="deleteFunc" class="cursor-pointer">🗑</Button>
      </div>
    </div>
  </div>
</template>
