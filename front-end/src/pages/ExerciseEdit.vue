<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ExerciseEdit from '../components/technical/EditExercise.vue'
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
  <div>
    <ExerciseEdit :current-exercise="currentExercise" />
  </div>
</template>
