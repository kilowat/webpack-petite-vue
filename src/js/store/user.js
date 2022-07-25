import { reactive } from 'petite-vue'

const state = reactive({
  data: null,
  isLoading: true,
  isError: false,
});

async function init({userService}) {
  try {
    state.isLoading = true;
    state.data = await userService.getCurrent();
  } catch(e){
    state.isError = true;
    console.log(e);
  } finally{
    state.isLoading = false;
  }
}

export default {
  init,
  get data() { return state.data },
  get isLoading() { return state.isLoading },
  get isError() { return state.isError },
};