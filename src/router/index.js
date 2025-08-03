import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import WeatherDetails from '..//pages/WeatherDetails.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/weatherdetails',
      name: 'WeatherDetails',
      component: WeatherDetails
    }
  ]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})