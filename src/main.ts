import './assets/creddit/style.css'
import './assets/minesweeper/mineweeper_style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(router)
app.mount('#app')
