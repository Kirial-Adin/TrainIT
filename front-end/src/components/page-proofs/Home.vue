<script setup vapor lang="ts">
import { Button } from '../ui/button'
import { computed, onMounted, ref } from 'vue'
import AddingModal from '../modal/AddingModal.vue'
import ExercisesList from '../lists/ExercisesList.vue'
import TrainingsList from '../lists/TrainingsList.vue'
import { useExercisesStore } from '../../stores/exercises'
import { useFiltersStore } from '../../stores/filters'
import { useTrainingStore } from '../../stores/trainings'

const store = useExercisesStore()
const filtersStore = useFiltersStore()
const trainingsStore = useTrainingStore()
const filtres = filtersStore.filtres
const component = computed(() => store.components)
const h1 = computed(() => (component.value === 'trainings' ? 'Все тренировки' : 'Все упражнения'))
const modal = ref(false)

function closeModal() {
  modal.value = false
}

onMounted(async () => {
  await store.getExercises()
  await trainingsStore.getTraining()
})
</script>

<template>
    <div v-show="modal">
      <AddingModal @modal="closeModal">
        <Button role="heading">
          X
        </Button>
      </AddingModal>
    </div>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
      <h1 class="text-2xl md:text-3xl font-bold mb-4 md:mb-10">
        {{ h1 }}
      </h1>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
        <Button class="cursor-pointer" @click="modal = !modal">
          +
        </Button>
        <div class="flex flex-col">
          <label for="select" class="hidden">Фильтрация</label>
          <select
            id="select"
            :value="filtres.sortBy"
            class="w-full sm:w-auto py-2 px-3 border border-gray-200 rounded-md focus:border-gray-40 outline-none focus:outline-none"
            @change="filtersStore.onChangeSelect"
          >
            <option value="title">
              По названию
            </option>
            <option value="complexity">
              По уровню сложности
            </option>
            <option value="type">
              По типу
            </option>
          </select>
        </div>
      </div>
    </div>
    <TrainingsList v-if="component === 'trainings'" />
    <ExercisesList v-else />
  </template>
