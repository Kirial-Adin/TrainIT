<script setup lang="ts">
import { computed } from 'vue'
import Registration from '../components/authorization/Registration.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const isAuth = computed(() => authStore.isAuth)
</script>

<template>
  <div>Profile</div>
  <Registration v-if="isAuth === false" />
  <!-- <Login v-if="isAuth === false" /> -->
</template>
