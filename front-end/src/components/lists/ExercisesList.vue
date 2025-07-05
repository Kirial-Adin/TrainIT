<script setup lang="ts">
import { computed } from 'vue'
import CardList from './CardList.vue'
import { useFiltersStore } from '../../stores/filters'

const filtersStore = useFiltersStore()
const items = computed(() => filtersStore.filteredAndSortedItems)
</script>

<template>
  <CardList :exercises="items" />
</template>
