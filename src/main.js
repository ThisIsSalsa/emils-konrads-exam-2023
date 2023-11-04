import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import header from './components/HeaderComponent.vue'
import navigation from './components/NavigationComponent.vue'
import audioplayer from './components/AudioPlayerComponent.vue'

const app = createApp(App)

app.use(createPinia())
app.component('Header', header)
app.component('Navigation', navigation)
app.component('AudioPlayer', audioplayer)
app.use(router)

app.mount('#app')
