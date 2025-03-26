<script setup lang="ts">
import { useUserStore } from '../stores/user'
import { useCharacterStore } from '../stores/character'

const userStore = useUserStore()
const characterStore = useCharacterStore()
</script>

<template>
  <div class="min-h-screen py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div class="max-w-md mx-auto">
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold text-gray-900">Ваш персонаж</h2>
                <div class="text-xl font-semibold text-indigo-600">
                  Очки: {{ userStore.profile.points }}
                </div>
              </div>

              <div
                class="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
              >
                <img src="../assets/character.jpg" width="200" height="300" />
              </div>

              <div class="mt-6 grid grid-cols-2 gap-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-semibold text-gray-900">Уровень</h3>
                  <p class="mt-1">{{ characterStore.characterProgress.level }}</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                  <h3 class="font-semibold text-gray-900">Телосложение</h3>
                  <p class="mt-1 capitalize">{{ characterStore.characterProgress.physique }}</p>
                </div>
              </div>

              <div class="mt-8">
                <h3 class="text-xl font-semibold text-gray-900 mb-4">Настроить</h3>

                <div class="mb-6">
                  <h4 class="font-medium text-gray-700 mb-2">Костюмы</h4>
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      v-for="(outfit, id) in characterStore.outfits"
                      :key="id"
                      @click="characterStore.purchaseOutfit(id)"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium',
                        userStore.profile.character.outfit === id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                      ]"
                    >
                      {{ outfit.name }} ({{ outfit.price }} очков)
                    </button>
                  </div>
                </div>

                <div>
                  <h4 class="font-medium text-gray-700 mb-2">Аксессуары</h4>
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      v-for="(accessory, id) in characterStore.accessories"
                      :key="id"
                      @click="characterStore.purchaseAccessory(id)"
                      :class="[
                        'px-4 py-2 rounded-lg text-sm font-medium',
                        userStore.profile.character.accessories.includes(id)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                      ]"
                    >
                      {{ accessory.name }} ({{ accessory.price }} очков)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
