<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useExercisesManagementStore } from '../stores/exercises-management'
import { Button } from '@/components/ui/button'
import { useRouter } from 'vue-router'

const store = useExercisesManagementStore()
const router = useRouter()

const form = ref({
  title: '',
  repeats: '',
  time: '',
  complexity: '',
  type: '',
  equipment: '',
  recommendation: '',
})

const measurementType = ref<'repeats' | 'time'>('repeats')
const imageFile = ref<File | null>(null)
const imagePreview = ref<string>('')

const complexityOptions = ['Легкий', 'Средний', 'Сложный']
const typeOptions = ['Сила', 'Кардио', 'Гибкость', 'Баланс', 'Другое']
const equipmentOptions = ['Нет', 'Гантели', 'Фитнес резинки', 'Коврик', 'Другое']

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0]
    imagePreview.value = URL.createObjectURL(target.files[0])
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    repeats: '',
    time: '',
    complexity: '',
    type: '',
    equipment: '',
    recommendation: '',
  }
  imageFile.value = null
  imagePreview.value = ''
  router.push({ name: 'home' })
}

const handleSubmit = async () => {
  if (!imageFile.value) {
    alert('Please select an image')
    return
  }

  try {
    const fileName = `${Date.now()}-${imageFile.value.name}`
    const exerciseData = {
      title: form.value.title,
      complexity: form.value.complexity,
      type: form.value.type,
      equipment: form.value.equipment,
      imageUrl: `/img/${fileName}`,
      recommendation: form.value.recommendation,
      ...(measurementType.value === 'repeats'
        ? { repeats: form.value.repeats, measurementType: 'repeats' }
        : { time: form.value.time, measurementType: 'time' }),
    }

    await store.createExercise(exerciseData, imageFile.value)
    resetForm()
    alert('Exercise created successfully!')
  } catch (error) {
    alert('Error creating exercise')
  }
}

onMounted(async () => {
  store.getLastId()
})
</script>

<template>
  <div
    class="relative flex flex-col items-center bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] mx-auto"
  >
    <div class="max-w-2xl mx-auto p-6">
      <h2 class="text-2xl font-bold mb-6">Добавить новое упражнение</h2>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label class="block text-sm font-medium mb-2">Название</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Тип измерения</label>
          <div class="flex gap-4">
            <label class="flex items-center">
              <input type="radio" v-model="measurementType" value="repeats" class="mr-2" />
              Повторы
            </label>
            <label class="flex items-center">
              <input type="radio" v-model="measurementType" value="time" class="mr-2" />
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
          />
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
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Сложность</label>
          <select
            v-model="form.complexity"
            required
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Выберите сложность</option>
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
            <option value="">Выберите тип</option>
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
            <option value="">Выберите оборудование</option>
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
            @change="handleImageChange"
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <img
            v-if="imagePreview"
            :src="imagePreview"
            alt="Preview"
            class="mt-2 max-w-xs rounded"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Рекомендация</label>
          <textarea
            v-model="form.recommendation"
            required
            rows="4"
            class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <Button
          type="submit"
          class="w-full bg-gray-100 text-black py-2 px-4 rounded hover:bg-gray-400 hover:text-white focus:ring-2 focus:ring-gray-500"
        >
          Добавить упражнение
        </Button>
      </form>
    </div>
  </div>
</template>
