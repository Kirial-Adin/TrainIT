<script setup lang="ts">
import { computed } from 'vue'
import { useFiltersStore } from '../stores/filters'
import CardList from './CardList.vue'

const filtersStore = useFiltersStore()
const items = computed(() => filtersStore.filteredAndSortedItems)
</script>

<template>
  <CardList :exercises="items" />
</template>
