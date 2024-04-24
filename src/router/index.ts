import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DayView from '../views/DayView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/:date',
    name: 'DayView',
    component: DayView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
