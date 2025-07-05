<script setup lang="ts">
import { ref } from 'vue'
import { useExercisesStore } from '../../stores/exercises'

const store = useExercisesStore()
const inMenuOpen = ref(false)

function toggleMenu() {
  inMenuOpen.value = !inMenuOpen.value
}
</script>

<template>
  <!-- <header
    class="flex flex-col md:flex-row justify-between border-b border-slate-300 bg-blue-700 px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-8"
  >
    <RouterLink to="/">
      <h1
        class="text-2xl md:text-3xl text-white hover:text-gray-300 font-bold underline text-center md:text-left mb-4 md:mb-0"
      >
        TrainIT
      </h1>
    </RouterLink>
    <ul class="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-6 lg:gap-10">
      <li
        class="flex items-center gap-3 text-lg md:text-xl lg:text-2xl text-white hover:text-gray-400 cursor-pointer"
      >
        <RouterLink to="/">
          <h1 @click="store.components = 'trainings'">Тренировки</h1>
        </RouterLink>
      </li>
      <li
        class="flex items-center gap-3 text-lg md:text-xl lg:text-2xl text-white hover:text-gray-400 cursor-pointer"
      >
        <RouterLink to="/">
          <h1 @click="store.components = 'exercises'">Упражнения</h1>
        </RouterLink>
      </li>
      <li
        class="flex items-center gap-3 text-lg md:text-xl lg:text-2xl text-white hover:text-gray-400 cursor-pointer"
      >
        <RouterLink to="/on-boarding">
          <h1>Персонаж</h1>
        </RouterLink>
      </li>
    </ul>
  </header> -->
  <header
    class="flex flex-col md:flex-row justify-between border-b border-slate-300 bg-blue-700 px-4 md:px-6 lg:px-10 py-4 md:py-6 lg:py-8"
  >
    <!-- Логотип и бургер-меню -->
    <div class="flex justify-between items-center">
      <RouterLink to="/">
        <h1
          class="text-2xl md:text-3xl text-white hover:text-gray-300 font-bold underline text-center md:text-left mb-4 md:mb-0"
        >
          TrainIT
        </h1>
      </RouterLink>
      <!-- Бургер-иконка для мобильных устройств -->
      <button type="button" class="md:hidden text-white focus:outline-none" @click="toggleMenu">
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>

    <!-- Навигационное меню -->
    <ul
      class="flex flex-col md:flex-row justify-center md:justify-end items-center gap-4 md:gap-6 lg:gap-10 md:flex" :class="{
        hidden: !inMenuOpen,
      }"
    >
      <li
        class="flex items-center gap-3 text-lg md:text-xl lg:text-2xl text-white hover:text-gray-400 cursor-pointer"
      >
        <RouterLink to="/">
          <h1 @click="store.components = 'trainings'">
            Тренировки
          </h1>
        </RouterLink>
      </li>
      <li
        class="flex items-center gap-3 text-lg md:text-xl lg:text-2xl text-white hover:text-gray-400 cursor-pointer"
      >
        <RouterLink to="/">
          <h1 @click="store.components = 'exercises'">
            Упражнения
          </h1>
        </RouterLink>
      </li>
      <li
        class="flex items-center gap-3 text-lg md:text-xl lg:text-2xl text-white hover:text-gray-400 cursor-pointer"
      >
        <RouterLink to="/on-boarding">
          <h1>Персонаж</h1>
        </RouterLink>
      </li>
    </ul>
  </header>
</template>
