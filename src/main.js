import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vueTheStorages from 'vue-the-storages'

createApp(App).use(router).use(vueTheStorages).mount('#app')
