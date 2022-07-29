
import { createApp } from 'petite-vue'
import components from './components'
import createStore from './store'
import directives from './directives';
import EventEmitter from './utils/EventEmitter';
import sl, { $sl } from './sl';

// init service locator
sl.init();

const store = createStore({ $sl });
const eventBus = new EventEmitter();

const settings = {
  eventBus,
  $sl,
  store,
  ...components,
}


const app = createApp(settings)

for(const i in directives) {
  app.directive(i, directives[i]);
}
// init app
app.mount('#app');

// fire global events
eventBus.on('remount', () => {
  app.mount('#app');
})

// auto init store
for (const i in store) {
  if (typeof store[i].init === 'function') 
    store[i].init();
}

document.addEventListener("DOMContentLoaded", function(event) { 
  //to do
  //app2
});


