import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InputView from '@/views/InputView.vue'
import ResultView from '@/views/ResultView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/input',
    name: 'Input',
    component: InputView
  },
  {
    path: '/result',
    name: 'Result',
    component: ResultView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
