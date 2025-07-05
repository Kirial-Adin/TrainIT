<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const email = ref<string>('')
const password = ref<string>('')
function login() {
  try {
    authStore.login(email.value, password.value)
  }
  catch (e: any) {
    console.error(e)
  }
}
</script>

<template>
  <div class="py-4 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <h2 class="text-2xl font-bold text-gray-900 mb-8">
                Добро пожаловать в Fitness is life!
              </h2>

              <form class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      v-model="email"
                      type="email"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700">Пароль</label>
                    <input
                      v-model="password"
                      type="password"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    >
                  </div>
                </div>

                <Button
                  type="button"
                  class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="login"
                >
                  Начать тренировку
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
