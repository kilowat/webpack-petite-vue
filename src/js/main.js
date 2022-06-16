
import { createApp } from 'petite-vue'
import components from './components'
import store from './store'
import directives from './directives';
import EventEmitter from './utils/EventEmitter';

const settings = {
  store,
  ...components,
}
const vapp = createApp(settings)
const eventBus = new EventEmitter();

for(const i in directives) {
  vapp.directive(i, directives[i]);
}

window.eventBus = eventBus;
window.vapp = vapp.mount('#app');

// init global store
store.favorite.init();

document.addEventListener("DOMContentLoaded", function(event) { 
  //to do
});


