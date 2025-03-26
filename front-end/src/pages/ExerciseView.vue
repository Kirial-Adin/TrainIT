<script setup vapor lang="ts">
import { onMounted } from 'vue'
import { useExercisesStore } from '../stores/exercises'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import ExerciseCard from '../components/ExerciseCard.vue'

const dataStore = useExercisesStore()
const route = useRoute()
const { currentExercise } = storeToRefs(dataStore)

onMounted(async () => {
  const id = Number(route.params.id)
  await dataStore.getExercisesById(id)
})
</script>

<template>
  <ExerciseCard :currentExercise="currentExercise" />
</template>
