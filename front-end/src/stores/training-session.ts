import type { Training, TrainingSession } from '../models'
import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useTrainingStore } from './trainings'
import { useUserStore } from './user'

export const useTrainingSessionStore = defineStore('trainingSession', () => {
  const currentSession = ref<TrainingSession | null>(null)
  const currentExerciseIndex = ref(0)
  const restTime = ref(30)
  const isResting = ref(false)
  const timer = ref(0)
  const timerInterval = ref<number | null>(null)
  const activateTraining = ref(false)
  const isCompleted = ref(false)

  const userStore = useUserStore()
  const trainingStore = useTrainingStore()

  const isSessionActive = computed(() => currentSession.value !== null)

  const currentExercise = computed(() => {
    if (
      !currentSession.value
      || currentExerciseIndex.value >= currentSession.value.completedExercises.length
    ) {
      return null
    }
    return currentSession.value.completedExercises[currentExerciseIndex.value]
  })

  function startTraining(training: Training) {
    currentSession.value = {
      trainingId: training.id,
      startTime: new Date(),
      completedExercises: training.exercises.map(ex => ({
        exerciseId: ex.exerciseId,
        actualValue: 0,
        duration: 0,
        restTime: 0,
      })),
      skippedExercises: [],
      totalPoints: 0,
      completed: false,
    }
    currentExerciseIndex.value = 0
  }

  function endTraining(id: string) {
    try {
      const response = axios.patch(`https://c1223b1bc21e6d23.mokky.dev/training/${id}`, {
        completed: true,
      })
      isCompleted.value = true
    }
    catch (error) {
      throw error
    }
    currentSession.value = null
  }

  function restartTraining(id: string) {
    try {
      const response = axios.patch(`https://c1223b1bc21e6d23.mokky.dev/training/${id}`, {
        completed: false,
      })
      isCompleted.value = false
      window.location.reload()
      trainingStore.startTrainingById(id)
    }
    catch (error) {
      throw error
    }
    currentSession.value = null
  }

  function startTimer() {
    if (timerInterval.value)
      return

    timerInterval.value = setInterval(() => {
      timer.value++
    }, 1000) as unknown as number
  }

  function stopTimer() {
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  function startRest() {
    isResting.value = true
    timer.value = restTime.value
    startTimer()
  }

  function adjustRestTime(seconds: number) {
    restTime.value = Math.max(0, restTime.value + seconds)
    if (isResting.value) {
      timer.value = restTime.value
    }
  }

  function completeExercise(actualValue: number) {
    if (!currentSession.value)
      return

    const exercise = currentSession.value.completedExercises[currentExerciseIndex.value]
    exercise.actualValue = actualValue
    exercise.duration = timer.value

    stopTimer()
    timer.value = 0
    currentExerciseIndex.value++

    if (currentExerciseIndex.value < currentSession.value.completedExercises.length - 1) {
      startRest()
    }
    else {
      finishTraining()
    }
  }

  function skipExercise() {
    if (!currentSession.value)
      return

    currentSession.value.skippedExercises.push(
      currentSession.value.completedExercises[currentExerciseIndex.value].exerciseId,
    )

    stopTimer()
    timer.value = 0

    if (currentExerciseIndex.value != currentSession.value.completedExercises.length) {
      currentExerciseIndex.value++
      startRest()
    }
    else {
      finishTraining()
    }
  }

  function finishTraining() {
    if (!currentSession.value)
      return

    currentSession.value.endTime = new Date()
    const points = userStore.calculateTrainingPoints(currentSession.value)
    currentSession.value.totalPoints = points
    userStore.addPoints(points)

    stopTimer()
    isResting.value = false
  }

  return {
    currentSession,
    currentExerciseIndex,
    restTime,
    isResting,
    timer,
    activateTraining,
    isCompleted,
    isSessionActive,
    currentExercise,
    startTraining,
    endTraining,
    restartTraining,
    completeExercise,
    skipExercise,
    adjustRestTime,
    startTimer,
    stopTimer,
  }
})
