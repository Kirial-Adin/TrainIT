import type { Exercise } from '../models'
import { defineStore, storeToRefs } from 'pinia'
import { computed, reactive } from 'vue'
import { useExercisesStore } from './exercises'
import { useTrainingStore } from './trainings'

export const useFiltersStore = defineStore('filters', () => {
  const dataStore = useExercisesStore()
  const trainingsStore = useTrainingStore()
  const filtres = reactive({
    sortBy: 'title',
    searchQuery: '',
  })
  const { exercises, components } = storeToRefs(dataStore)
  const { trainings } = storeToRefs(trainingsStore)

  const currentItems = computed(() =>
    components.value === 'exercises' ? exercises.value : trainings.value,
  )

  const onChangeSelect = (event: Event) => {
    filtres.sortBy = (event.target as HTMLInputElement).value
  }

  const filteredAndSortedItems = computed(() => {
    return [...currentItems.value]
      .filter(item => item.title.toLowerCase().includes(filtres.searchQuery.toLowerCase()))
      .sort((a, b) => {
        const key = filtres.sortBy as keyof Exercise
        if (a[key] < b[key])
          return -1
        if (a[key] > b[key])
          return 1
        return 0
      })
  })

  const filteredAndSortedExercises = computed(() => {
    return [...exercises.value]
      .filter(item => item.title.toLowerCase().includes(filtres.searchQuery.toLowerCase()))
      .sort((a, b) => {
        const key = filtres.sortBy as keyof Exercise
        if (a[key] < b[key])
          return -1
        if (a[key] > b[key])
          return 1
        return 0
      })
  })

  return {
    filtres,
    components,
    onChangeSelect,
    filteredAndSortedItems,
    filteredAndSortedExercises,
  }
})
