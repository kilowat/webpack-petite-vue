import { reactive } from 'petite-vue'
import UserSerivce from '../api/user/UserService';

/**
 * @param { Object } param
 * @param { UserSerivce } param.userService
 */
export default ({ userService }) => {
  const state = reactive({
    data: null,
    isLoading: true,
    isError: false,
  });

  async function init() {
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
  
  return {
    init,
    get data() { return state.data },
    get isLoading() { return state.isLoading },
    get isError() { return state.isError },
  }
};
