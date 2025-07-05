<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import type { Exercise, Training, TrainingExercise } from '../../models'
import { useExercisesStore } from '../../stores/exercises'
import { useExercisesManagementStore } from '../../stores/exercises-management'
import { useTrainingStore } from '../../stores/trainings'
import { useUserStore } from '../../stores/user'

const exerciseStore = useExercisesStore()
const managementStore = useExercisesManagementStore()
const trainingStore = useTrainingStore()
const userStore = useUserStore()

const exercise = computed(() => exerciseStore.exercises)
const selectedType = ref('')
const exerciseValues = ref<Record<number, number>>({})
const measurementType = managementStore.measurementType
const imageFile = ref<File | null>(null)
const imagePreview = ref<string>('')

const training = ref<Partial<Omit<Training, 'id'>>>({
    title: '',
    complexity: 'Средний',
    type: 'general',
    equipment: '',
    imageUrl: '',
    description: '',
    time: 0,
    exercises: [] as TrainingExercise[],
})

function imageTraining(event: Event) {
    const target = event.target as HTMLInputElement
    if (target.files && target.files[0]) {
        imageFile.value = target.files[0]
        imagePreview.value = URL.createObjectURL(target.files[0])
    }
}

const filteredExercises = computed(() => {
    if (!selectedType.value)
        return exerciseStore.exercises
    return exerciseStore.getExercisesByType(selectedType.value)
})

function formatTime(seconds?: number): string {
    if (!seconds)
        return ''
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`
}

function isOverMaxValue(exercise: Exercise): boolean {
    const value = exerciseValues.value[exercise.id]
    if (!value)
        return false

    if (exercise.measurementType === 'repeats') {
        return value > (exercise.repeats || 0) * 2
    }
    else {
        return value > (exercise.time || 0) * 2
    }
}

function getExerciseTitle(id: number): string {
    return exerciseStore.getById(id)?.title || ''
}

function addExercise(exercise: Exercise) {
    const value
        = exerciseValues.value[exercise.id]
        || (exercise.measurementType === 'repeats' ? exercise.repeats : exercise.time)
        || 0
    const goal = userStore.calculateGoal(exercise)

    const existingIndex = training.value.exercises.findIndex(
        exer => exer.exerciseId === exercise.id,
    )

    const newExercise: TrainingExercise = {
        exerciseId: exercise.id,
        value,
        goal,
        measurementType: exercise.measurementType,
    }

    if (existingIndex >= 0) {
        training.value.exercises[existingIndex] = newExercise
    }
    else {
        training.value.exercises.push(newExercise)
    }
}

function removeExercise(exerciseId: number) {
    training.value.exercises = training.value.exercises.filter(
        exer => exer.exerciseId !== exerciseId,
    )
}

async function saveTraining() {
    try {
        await trainingStore.saveTraining(training.value, imageFile.value)
    }
    catch (error) {
        console.error('Failed to save training:', error)
        alert('Failed to save training')
    }
}

onMounted(async () => {
    await exerciseStore.getExercises()
    await trainingStore.getTrainingLastId()
})


</script>

<template>
    <div v-if="exercise"
        class="relative flex flex-col items-center bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] mx-auto">
        <div class="flex flex-col justify-items-center max-w-4xl mx-auto p-4">
            <h1 class="text-2xl font-bold mb-6">
                Создание тренировки
            </h1>

            <div class="mb-6">
                <label class="block mb-2">Название</label>
                <Input v-model="training.title" class="w-full p-2 border rounded" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-2">Превью упражнения</label>
                <Input type="file" accept="image/*" required
                    class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" @change="imageTraining" />
                <img v-if="imagePreview" :src="imagePreview" alt="Preview" class="mt-2 max-w-xs rounded">
            </div>

            <div class="mb-6">
                <h2 class="text-xl mb-4">
                    Добавить упражнение
                </h2>

                <div class="flex flex-row space-x-4 items-center mb-4">
                    <label class="block mb-2">Фильтрация по типу:</label>
                    <select v-model="selectedType"
                        class="w-full sm:w-auto py-2 px-3 border border-gray-200 rounded-md focus:border-gray-40 outline-none focus:outline-none">
                        <option value="">
                            Все
                        </option>
                        <option value="Пресс">
                            Пресс
                        </option>
                        <option value="Плечи">
                            Плечи
                        </option>
                        <option value="Ноги">
                            Ноги
                        </option>
                        <option value="Торс">
                            Торс
                        </option>
                        <option value="Бицепс">
                            Бицепс
                        </option>
                    </select>
                </div>

                <div v-auto-animate class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="exercise in filteredExercises" :key="exercise.id" class="border p-4 rounded">
                        <div class="aspect-video mb-3">
                            <img :src="exercise.imageUrl" :alt="exercise.title" class="w-full h-full object-cover rounded">
                        </div>

                        <h3 class="font-bold">
                            {{ exercise.title }}
                        </h3>
                        <p class="text-sm text-gray-600 mb-2">
                            {{ exercise.type }}
                        </p>
                        <p class="text-sm text-gray-600 mb-2">
                            {{ exercise.equipment }}
                        </p>

                        <div class="mt-2">
                            <label class="block mb-1">{{
                                exercise.measurementType === 'repeats' ? 'Повторы:' : 'Время:'
                            }}</label>
                            <Input v-model.number="exerciseValues[exercise.id]" type="number"
                                :class="{ 'border-red-500': isOverMaxValue(exercise) }" class="w-24 p-1 border rounded" />

                            <h1 v-if="isOverMaxValue(exercise)" class="text-red-500 text-sm mt-1">
                                Внимание: Значение превышает рекомендованный максимум!
                            </h1>

                            <h1 class="text-sm text-gray-600 mt-2">
                                Рекомендовано:
                                {{
                                    exercise.measurementType === 'repeats'
                                    ? `${exercise.repeats} повторов`
                                    : formatTime(exercise.time)
                                }}
                            </h1>
                        </div>

                        <Button class="cursor-pointer mt-4 bg-blue-400 hover:bg-blue-500 text-white px-4 py-1 rounded"
                            @click="addExercise(exercise)">
                            Добавить в тренировку
                        </Button>
                    </div>
                </div>
            </div>

            <div class="mt-6">
                <h2 class="text-xl mb-4">
                    Выбранные упражнения
                </h2>
                <div v-for="ex in training.exercises" :key="ex.exerciseId" class="mb-2 p-2 border rounded">
                    <div class="flex flex-row justify-between justify-items-center items-center">
                        <span>{{ getExerciseTitle(ex.exerciseId) }}</span>
                        <div class="flex flex-row items-center">
                            <span v-if="measurementType === 'repeats'">
                                {{ ex.value }}
                                {{ exercise.measurementType === 'repeats' ? 'повторов' : 'секунд' }}</span>
                            <Button class="cursor-pointer ml-4 text-red-500" @click="removeExercise(ex.exerciseId)">
                                Удалить
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Button class="cursor-pointer mt-6 bg-blue-400 hover:bg-blue-500 text-white px-6 py-2 rounded"
                @click="saveTraining">
                Сохранить тренировку
            </Button>
        </div>
    </div>
</template>
