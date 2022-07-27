
import { createApp } from 'petite-vue'
import components from './components'
import createStore from './store'
import directives from './directives';
import EventEmitter from './utils/EventEmitter';
import sl, { $sl } from './sl';

sl.init();

const store = createStore({ $sl });

const settings = {
  $sl,
  store,
  ...components,
}

const app = createApp(settings)
const eventBus = new EventEmitter();

for(const i in directives) {
  app.directive(i, directives[i]);
}

window.eventBus = eventBus;
app.mount('#app');

// init global store
store.favorite.init();
store.user.init();

document.addEventListener("DOMContentLoaded", function(event) { 
  //to do
  //app2
});


