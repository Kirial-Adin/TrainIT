<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useExercisesStore } from '../stores/exercises'
import ExerciseEdit from '../components/technical/EditExercise.vue'
import getExercisesById from '../utils/getExercisesById'

const dataStore = useExercisesStore()
const currentExercise = computed(() => dataStore.currentExercise)

onMounted(async () => {
  await getExercisesById()  
})
</script>

<template>
  <div v-if="currentExercise">
    <ExerciseEdit :current-exercise="currentExercise" />
  </div>
</template>
