import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DayView from '../views/DayView.vue'
import SummaryView from '../views/SummaryView.vue'

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
  },
  {
    path: '/ExpenseSummary',
    name: 'SummaryView',
    component: SummaryView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
