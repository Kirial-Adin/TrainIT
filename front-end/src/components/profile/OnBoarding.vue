<script setup lang="ts">
import type { UserProfile } from '../../models'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()

const height = ref(170)
const weight = ref(70)
const experience = ref('Начинающий')
const trainingGoal = ref('weightLoss')

const profile = ref({
    weight,
    height,
    experience,
    trainingGoal,
    points: 0,
    character: {
        outfit: 'стандартный',
        accessories: [],
    },
})

function saveProfile(profile: UserProfile) {
    userStore.saveProfile(profile)
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
                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Рост (см)</label>
                                    <Input v-model="height" type="number"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Вес (кг)</label>
                                    <Input v-model="weight" type="number"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        required />
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Уровень подготовки</label>
                                    <select v-model="experience"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                        <option value="Начинающий">
                                            Начинающий
                                        </option>
                                        <option value="Занимающийся">
                                            Занимающийся
                                        </option>
                                        <option value="Опытный">
                                            Опытный
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium text-gray-700">Цель</label>
                                    <select v-model="trainingGoal"
                                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                                        <option value="weightLoss">
                                            Потеря веса
                                        </option>
                                        <option value="muscleGain">
                                            Увеличение мышц
                                        </option>
                                        <option value="endurance">
                                            Выносливость
                                        </option>
                                        <option value="flexibility">
                                            Гибкость
                                        </option>
                                    </select>
                                </div>

                                <Button type="button"
                                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    @click="saveProfile(profile)">
                                    Начать тренировку)
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
