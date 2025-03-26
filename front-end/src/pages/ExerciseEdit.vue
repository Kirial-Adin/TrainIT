<script setup lang="ts">
import { onMounted } from 'vue'
import { useExercisesStore } from '../stores/exercises'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import ExerciseEdit from '../components/EditExercise.vue'

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
    <ExerciseEdit :currentExercise="currentExercise" />
  </div>
</template>
