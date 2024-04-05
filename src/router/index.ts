import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CredditView from '../views/CredditView.vue'
import Minesweeper_proxy from '../views/Minesweeper_proxy.vue'
import QuizView from '../views/QuizView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/creddit',
      name: 'creddit',
      component: CredditView
    },
    {
      path: '/minesweeper',
      name: 'minesweeper',
      component: Minesweeper_proxy
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizView
    },
  ]
})

export default router
