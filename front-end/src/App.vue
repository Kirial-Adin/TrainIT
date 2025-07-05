<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Header from './components/page-proofs/Header.vue'
import { useExercisesStore } from './stores/exercises'
import { useTrainingStore } from './stores/trainings'

const store = useExercisesStore()
const trainingsStore = useTrainingStore()

onMounted(async () => {
  await store.getExercises()
  await trainingsStore.getTraining()
})
</script>

<template>
  <div class="bg-white md:w-4/5 m-auto rounded-xl shadow-xl md:mt-14 sm:w-full sm:mt-0">
    <Header />
    <div class="md:p-10">
      <RouterView />
    </div>
  </div>
</template>
