<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { onMounted, ref } from 'vue'
import { useExercisesManagementStore } from '../../stores/exercises-management'

const props = defineProps<{
  currentExercise: any
}>()
const store = useExercisesManagementStore()
const measurementType = ref<'repeats' | 'time'>('repeats')
const imageFile = ref<File | null>(null)
const imagePreview = ref<string>('')

const form = ref({
  title: '',
  repeats: '',
  time: '',
  complexity: '',
  type: '',
  equipment: '',
  recommendation: '',
  imageUrl: '',
})

const complexityOptions = ['Легкий', 'Средний', 'Сложный']
const typeOptions = ['Сила', 'Кардио', 'Гибкость', 'Баланс', 'Другое']
const equipmentOptions = ['Нет', 'Гантели', 'Фитнес резинки', 'Коврик', 'Другое']

function handleImageEdit(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0]
    imagePreview.value = URL.createObjectURL(target.files[0])
  }
}

async function handleSubmit() {
  try {
    const exerciseData = {
      id: props.currentExercise.id,
      title: form.value.title,
      complexity: form.value.complexity,
      type: form.value.type,
      equipment: form.value.equipment,
      recommendation: form.value.recommendation,
      imageUrl: form.value.imageUrl,
      ...(measurementType.value === 'repeats'
        ? { repeats: form.value.repeats, time: undefined }
        : { time: form.value.time, repeats: undefined }),
    }

    if (imageFile.value) {
      const fileName = `${Date.now()}-${imageFile.value.name}`
      exerciseData.imageUrl = `/img/${fileName}`
    }

    await store.updateExercise(exerciseData, imageFile.value)
    alert('Exercise updated successfully!')
  }
  catch (error) {
    alert('Error updating exercise')
    console.error(error)
  }
}

onMounted(() => {
  setTimeout(() => {
    form.value = {
      title: props.currentExercise.title,
      repeats: props.currentExercise.repeats,
      time: props.currentExercise.time,
      complexity: props.currentExercise.complexity,
      type: props.currentExercise.type,
      equipment: props.currentExercise.equipment,
      recommendation: props.currentExercise.recommendation,
      imageUrl: props.currentExercise.imageUrl,
    }
  }, 500)
})
</script>

<template>
  <div
    v-if="props.currentExercise"
    class="relative flex flex-col items-center bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] mx-auto"
  >
    <div class="max-w-2xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">
        Изменить упражнение
      </h2>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium mb-2">Название</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Тип измерения</label>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input v-model="measurementType" type="radio" value="repeats" class="mr-2">
              Повторы
            </label>
            <label class="flex items-center">
              <input v-model="measurementType" type="radio" value="time" class="mr-2">
              Время
            </label>
          </div>
        </div>

        <div v-if="measurementType === 'repeats'">
          <label class="block text-sm font-medium mb-2">Число повторов</label>
          <input
            v-model="form.repeats"
            type="number"
            min="1"
            step="1"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div v-else>
          <label class="block text-sm font-medium mb-2">Время выполнения</label>
          <input
            v-model="form.time"
            type="number"
            min="1"
            step="1"
            required
            placeholder="e.g., 30 seconds, 1 minute"
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Сложность</label>
          <select
            v-model="form.complexity"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Выберите сложность
            </option>
            <option v-for="option in complexityOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Тип</label>
          <select
            v-model="form.type"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Выберите тип
            </option>
            <option v-for="option in typeOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Оборудование</label>
          <select
            v-model="form.equipment"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              Выберите оборудование
            </option>
            <option v-for="option in equipmentOptions" :key="option" :value="option">
              {{ option }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Превью упражнения</label>
          <input
            type="file"
            accept="image/*"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            @change="handleImageEdit"
          >
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Preview"
            class="mt-2 max-w-xs rounded"
          >
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Рекомендация</label>
          <textarea
            v-model="form.recommendation"
            required
            rows="4"
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button
          type="submit"
          class="w-full text-black bg-gray-100 py-2 px-4 rounded hover:bg-gray-400 hover:text-white focus:ring-2 focus:ring-gray-500"
        >
          Обновить упражнение
        </Button>
      </form>
    </div>
  </div>
</template>
