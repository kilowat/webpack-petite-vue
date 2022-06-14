
import { createApp } from 'petite-vue'
import components from './components'
import store from './store'
import EventEmitter from './utils/EventEmitter';


const settings = {
  store,
  ...components,
}
const eventBus = new EventEmitter();
window.eventBus = eventBus;
window.vapp = createApp(settings).mount('#app')

document.addEventListener("DOMContentLoaded", function(event) { 
  // to do
});


