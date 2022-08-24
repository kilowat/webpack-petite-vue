
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
/*Fix valid html*/
const init = ()=> {
  const attrs = {
    'data-v-scope': 'v-scope',
    'data-v-effect': 'v-effect',
    'data-v-class' : ':class',
    'data-v-mounted': 'v-on:vue:mounted',
    'data-v-unmounted': 'v-on:vue:unmounted',
    'data-v-on-click': 'v-on:click',
    'data-v-on-keyup': 'v-on:keyup',
    'data-v-bind': 'v-bind',
    'data-v-model': 'v-model',
    'data-v-if': 'v-if',
    'data-v-else': 'v-else',
    'data-v-else-if': 'v-else-if',
    'data-v-for': 'v-for',
    'data-v-show': 'v-show',
    'data-v-html': 'v-html',
    'data-v-text': 'v-text',
    'data-v-pre': 'v-pre',
    'data-v-once': 'v-once',
    'data-v-cloak': 'v-cloak',
    'data-v-disabled': ':disabled',
    'data-v-submit': 'v-on:submit.prevent',
  };
  for(const attrIndex in attrs) {
    document.querySelectorAll('['+attrIndex+']')
        .forEach((el) => {
            if(el.hasAttribute(attrIndex)) {
              const attr = el.getAttribute(attrIndex);
              el.removeAttribute(attrIndex)
              el.setAttribute(attrs[attrIndex], attr);
            }
        });
  }
  app.mount('#app');
}

init();
// fire global events
eventBus.on('mount', () => {
  init();
})

// auto init store
for (const i in store) {
  if (typeof store[i].init === 'function') 
    store[i].init();
}

document.addEventListener("DOMContentLoaded", function(event) { 
  //to do
});
