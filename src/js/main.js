
 import { createApp } from 'petite-vue'
import components from './components'
import store from './store'
 const app = {
   ...store,
   ...components
 }
 createApp(app).mount('#app')