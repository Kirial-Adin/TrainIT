<script setup vapor lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ExerciseCard from '../components/cards/ExerciseCard.vue'
import { useExercisesStore } from '../stores/exercises'

const dataStore = useExercisesStore()
const route = useRoute()
const { currentExercise } = storeToRefs(dataStore)

onMounted(async () => {
  const id = Number(route.params.id)
  await dataStore.getExercisesById(id)
})
</script>

<template>
  <ExerciseCard :current-exercise="currentExercise" />
</template>
