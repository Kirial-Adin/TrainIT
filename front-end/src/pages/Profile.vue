<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import Registration from '../components/Registration.vue'
import Login from '../components/Login.vue'

const authStore = useAuthStore()
const isAuth = computed(() => authStore.isAuth)

</script>

<template>
    <div>Profile</div>
    <Registration v-if="isAuth === false" />
    <!-- <Login v-if="isAuth === false" /> -->
</template>