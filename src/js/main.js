
import { createApp } from 'petite-vue'
import components from './components'
import store from './store'
import EventEmitter from './utils/EventEmitter';

const eventBus = new EventEmitter();

const settings = {
  eventBus,
  store,
  ...components,
}

eventBus.on('on-change', ()=>{console.log('test')});

window.vapp = createApp(settings).mount('#app')

document.addEventListener("DOMContentLoaded", function(event) { 
  // to do
});


