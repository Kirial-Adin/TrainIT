<script setup vapor lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import ExerciseCard from '../components/cards/ExerciseCard.vue'
import { useExercisesStore } from '../stores/exercises'
import getExercisesById from '../utils/getExercisesById'


const dataStore = useExercisesStore()
const { currentExercise } = storeToRefs(dataStore)

onMounted(async () => {
  getExercisesById()
})
</script>

<template>
  <ExerciseCard :current-exercise="currentExercise" />
</template>
