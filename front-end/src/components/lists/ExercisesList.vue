<script setup lang="ts">
import { computed } from 'vue'
import { useFiltersStore } from '../../stores/filters'
import { onMounted } from 'vue'
import CardList from './CardList.vue'


const filtersStore = useFiltersStore()
const items = computed(() => filtersStore.filteredAndSortedItems)

onMounted(() => {
  console.log(...items.value.map((item: any) => item._id));
  
})
</script>

<template>
  <CardList :exercises="items" />
</template>
