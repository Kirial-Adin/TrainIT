<script setup lang="ts">
defineProps<{
  currentExercise: any
}>()
</script>

<template>
  <div
    v-if="currentExercise"
    class="relative flex flex-col items-center bg-white border border-slate-100 rounded-2xl p-4 sm:p-6 lg:p-8 w-full max-w-[95%] sm:max-w-[85%] md:max-w-[75%] lg:max-w-[65%] mx-auto"
  >
    <h1
      class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-center pb-3 sm:pb-4 md:pb-6"
    >
      {{ currentExercise.title }}
    </h1>
    <img
      :src="currentExercise.imageUrl"
      alt="Sneaker"
      class="w-full sm:w-[90%] md:w-[85%] lg:w-[80%] h-auto rounded-xl object-cover shadow-md"
    >
    <div class="flex flex-col gap-2 sm:gap-3 md:gap-4 w-full mt-4 sm:mt-6 md:mt-8 px-2 sm:px-4">
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <span class="text-slate-600 text-sm sm:text-base">Сложность:</span>
        <p class="font-medium text-sm sm:text-base">
          {{ currentExercise.complexity }}
        </p>
      </div>
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <span class="text-slate-600 text-sm sm:text-base">Тип:</span>
        <p class="font-medium text-sm sm:text-base">
          {{ currentExercise.type }}
        </p>
      </div>
      <div
        v-if="currentExercise.repeats"
        class="flex items-center justify-between border-b border-slate-100 pb-2"
      >
        <span class="text-slate-600 text-sm sm:text-base">Повторы:</span>
        <p class="font-medium text-sm sm:text-base">
          {{ currentExercise.repeats }} раз
        </p>
      </div>
      <div
        v-if="currentExercise.time"
        class="flex items-center justify-between border-b border-slate-100 pb-2"
      >
        <span class="text-slate-600 text-sm sm:text-base">Время:</span>
        <p class="font-medium text-sm sm:text-base">
          {{ currentExercise.time }} секунд
        </p>
      </div>
      <div class="flex items-center justify-between border-b border-slate-100 pb-2">
        <span class="text-slate-600 text-sm sm:text-base">Оборудование:</span>
        <p class="font-medium text-sm sm:text-base">
          {{ currentExercise.equipment }}
        </p>
      </div>
      <div class="flex flex-col items-center justify-between border-b border-slate-100 pb-2">
        <span class="text-slate-600 text-sm sm:text-base">Рекомендация:</span>
        <p class="font-medium text-sm sm:text-base">
          {{ currentExercise.recommendation }}
        </p>
      </div>
    </div>
  </div>
</template>
