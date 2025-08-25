<script setup lang="ts">
import type { Exercise, TrainingExercise } from '../../models'
import { computed, onUnmounted, ref } from 'vue'
import ChooseTraining from '../../components/technical/ChooseTraining.vue'
import { useExercisesStore } from '../../stores/exercises'
import { useTrainingSessionStore } from '../../stores/training-session'
import TrainingSession from '../../feauters/training session/TrainingSession.vue'

const exerciseStore = useExercisesStore()
const sessionStore = useTrainingSessionStore()

const currentExercise = computed((): TrainingExercise | null => {
    if (!sessionStore.currentSession || !sessionStore.currentExercise)
        return null
    return sessionStore.currentExercise
})

const exercise = computed((): Exercise | null => {
    if (!currentExercise.value)
        return null
    return exerciseStore.getById(currentExercise.value.exerciseId)
})

onUnmounted(() => {
    sessionStore.stopTimer()
})
</script>

<template>
    <div>
        <div class="max-w-4xl mx-auto px-4 custom-padding">
            <template v-if="!sessionStore.isSessionActive && !sessionStore.currentSession?.completed">
                <ChooseTraining />
            </template>

            <template v-else-if="sessionStore.currentSession && !sessionStore.activateTraining">
                <TrainingSession />
            </template>
        </div>
    </div>
</template>

