<script setup lang="ts">
import type { Exercise, TrainingExercise } from '../../models'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useExercisesStore } from '../../stores/exercises'
import { useTrainingSessionStore } from '../../stores/training-session'
import { useTrainingStore } from '../../stores/trainings'
import Exercises from '../../feauters/training session/ui/Exercises.vue'
import Rest from '../../feauters/training session/ui/Rest.vue'
import EndTraining from '../../feauters/training session/ui/EndTraining.vue'
import isComplete from '../../feauters/training session/ui/isCompleted.vue'

const route = useRoute()

const id = ref('')
const exerciseStore = useExercisesStore()
const sessionStore = useTrainingSessionStore()
const trainingStore = useTrainingStore()

const currentExercise = computed((): TrainingExercise | null => {
  if (!sessionStore.currentSession || !sessionStore.currentExercise) return null
  return sessionStore.currentExercise
})

const exercise = computed((): Exercise | null => {
  if (!currentExercise.value) return null
  return exerciseStore.getById(currentExercise.value.exerciseId)
})

onUnmounted(() => {
  sessionStore.stopTimer()
})

onMounted(() => {
  id.value = route.params.id
  trainingStore.startTrainingById(id.value)
})
</script>

<template>
  <isComplete v-if="sessionStore.currentSession?.completed" />
  <div v-else>
    <div class="max-w-4xl mx-auto px-4 custom-padding">
      <template v-if="sessionStore.currentSession">
        <Exercises v-if="currentExercise && exercise && !sessionStore.isResting" />

        <Rest v-else-if="sessionStore.isResting" />

        <EndTraining :id="id" v-else />
      </template>
    </div>
  </div>
</template>
