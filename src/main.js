import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { store } from './vuex/store'
import { router } from './router'
import 'primeicons/primeicons.css'

createApp(App).use(store).use(router).mount('#app');

