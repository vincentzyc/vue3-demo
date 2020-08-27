import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import BaseComponents from './components/base'

const app = createApp(App)

app.use(BaseComponents)

app.use(store).use(router).mount('#app')
