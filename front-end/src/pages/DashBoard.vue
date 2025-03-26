<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import { Button } from '@/components/ui/button'

const userStore = useUserStore()
const profile = computed(() => (userStore.profile))

</script>
<template>
  <div class="min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Профиль</h2>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Рост:</span>
              <span class="font-medium">{{ profile.height }} см</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Вес:</span>
              <span class="font-medium">{{ profile.weight }} кг</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Опыт:</span>
              <span class="font-medium capitalize">{{ profile.experience }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Очки:</span>
              <span class="font-medium text-indigo-600">{{ profile.points }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Быстрые действия</h2>
          <div class="space-y-4">
            <router-link
              to="/character"
              class="block w-full px-4 py-2 text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Редактировать персонажа
            </router-link>
            <Button
              class="block w-full px-4 py-2 text-center text-white bg-green-600 rounded-md hover:bg-green-700"
              as-child
            >
              <RouterLink to="/train"> Начать тренировку </RouterLink>
            </Button>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Прогресс</h2>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Недельная цель</span>
                <span>4/7 дней</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" style="width: 57%"></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1">
                <span>Месячная цель</span>
                <span>15/30 дней</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" style="width: 50%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-8 bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold text-gray-900">Недавняя активность</h2>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Тренировка всего тела</p>
                <p class="text-sm text-gray-500">Завершено • 45 минут</p>
              </div>
              <span class="text-green-600 font-medium">+150 очков</span>
            </div>
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Кардиотренировка</p>
                <p class="text-sm text-gray-500">Завершено • 30 минут</p>
              </div>
              <span class="text-green-600 font-medium">+100 очков</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
