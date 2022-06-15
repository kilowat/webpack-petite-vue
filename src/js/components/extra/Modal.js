import { reactive } from 'petite-vue'

const state = reactive({
  items:{},
  init(id, data) {
    const $el = document.querySelector('#'+id);
    if (!this.items[id]) this.items[id] = {};
    this.items[id].$el = $el;
    this.items[id].data = data || {};
  }
})

export default {
  create(id, data){
    state.init(id, data);
    return {
      get data() {return state.items[id].data},
    }
  },
  show(id, data) {
    if (!state.items[id]) throw Error(`Modal with id ${id} not found`);
    if (data) state.items[id].data = data;
    state.items[id].$el.setAttribute('aria-hidden', false);
  },
  close(id) {
    if (!state.items[id]) throw Error(`Modal with id ${id} not found`);
    state.items[id].data = {};
    state.items[id].$el.setAttribute('aria-hidden', true);
  },
  closeAll() {
    for(const i in state.items) {
      this.close(i);
    }
  }
};