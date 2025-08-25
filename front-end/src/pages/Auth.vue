<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import Registration from '../components/authorization/Registration.vue'
import Login from '../components/authorization/Login.vue'


const route = useRoute()
const authType = ref(route.matched[0].props.default.authType)

watch(() => route.matched[0].props.default.authType, (newAuthType) => {
  authType.value = newAuthType
})

defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div>
    <Registration v-if="authType == 'registration'" v-bind="$attrs"/>
    <Login v-else-if="authType == 'login'"  v-bind="$attrs"/>
  </div>
</template>
