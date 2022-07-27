import { reactive } from 'petite-vue'

export default () => {
  const KEY = 'favorite';
  const state = reactive({
    items: [],
  });
  
  function add(id) {
    const index = state.items.indexOf(id);
    if (index > -1) {
      state.items.splice(index, 1);
    } else {
      state.items.push(id)
    }
  }
  
  function isSelected(id) {
    return state.items.includes(id);
  }
  
  async function init() {
    const storageValue = localStorage.getItem(KEY);
    if (storageValue) {
      try {
        state.items = JSON.parse(storageValue);
      } catch (e) {
        console.log(e);
      }
    }
  }
  
  return {
    get items() { return state.items },
    get count() { return state.items.length},
    isSelected,
    add,
    init,
  }
};