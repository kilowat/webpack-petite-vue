import { reactive } from 'petite-vue'

  const basket = reactive({
    count: 0,
    inc() {
      this.count++
    }
  })

  export default basket;
/*
async function init() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = [{id: 1, name:'test'}];
      state.items = response;
      resolve(response);
    }, 1000)
  })
}
*/

