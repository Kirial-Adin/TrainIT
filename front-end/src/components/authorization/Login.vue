<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const email = ref<string>('')
const password = ref<string>('')

const loginObj = ref({
  email,
  password
})

function login(loginObj: Object) {
  try {
    authStore.login(loginObj)
  } catch (e: any) {
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
                С возвращением в Fitness is life!
              </h2>
              <form class="space-y-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-lg font-medium text-gray-700">Email</label>
                    <Input
                      v-model="email"
                      type="email"
                      class="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 text-lg p-3"
                      required
                    />
                  </div>

                  <div>
                    <label class="block text-lg font-medium text-gray-700">Пароль</label>
                    <Input
                      v-model="password"
                      type="password"
                      class="mt-2 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-400 focus:ring-indigo-400 text-lg p-3"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  class="w-full flex justify-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  @click="login(loginObj)"
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
