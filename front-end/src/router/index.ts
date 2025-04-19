import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ExerciseView from '../pages/ExerciseView.vue'
import ExerciseCreate from '../pages/ExerciseCreate.vue'
import ExerciseEdit from '../pages/ExerciseEdit.vue'
import TrainingsCreate from '../pages/TrainingsCreate.vue'
import TrainingMode from '../pages/TrainingMode.vue'
import TrainingSession from '../pages/TrainingSession.vue'
import OnBoarding from '../pages/OnBoarding.vue'
import DashBoard from '../pages/DashBoard.vue'
import Character from '../pages/Character.vue'
import Profile from '../pages/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/exercise/:id',
      name: 'exercise',
      component: ExerciseView,
      props: true,
    },
    {
      path: '/exercise-create',
      name: 'exercise-create',
      component: ExerciseCreate,
    },
    {
      path: '/exercise-edit/:id',
      name: 'exercise-edit',
      component: ExerciseEdit,
      props: true,
    },
    {
      path: '/training-create',
      name: 'training-create',
      component: TrainingsCreate,
    },
    {
      path: '/train',
      name: 'train',
      component: TrainingMode,
    },
    {
      path: '/train/:id',
      name: 'trainId',
      component: TrainingSession,
    },
    {
      path: '/on-boarding',
      name: 'on-boarding',
      component: OnBoarding,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoard,
    },
    {
      path: '/character',
      name: 'character',
      component: Character,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
    }
  ],
})

export default router
