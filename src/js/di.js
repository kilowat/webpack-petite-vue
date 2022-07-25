import Bottle from "bottlejs";
import axios from "axios";
import UserSerivce from "./api/user/UserService";
import config from "./api/config";

export const di = new Bottle();
export const init = () => {
  di.factory('client', (container) => {
    return axios.create(config);
  });
  
  di.service('userService', UserSerivce, 'client');
}

const container = di.container;

export const $get = container;

export default {
  init,
}