import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CredditView from '../views/CredditView.vue'
import Minesweeper from '../views/Minesweeper.vue'

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
      component: Minesweeper
    }
  ]
})

export default router
