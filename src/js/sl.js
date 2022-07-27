import Bottle from "bottlejs";
import ky from "ky";
import UserSerivce from "./api/user/UserService";
import config from "./api/config";

export const sl = new Bottle();

export const init = () => {
  sl.factory('client', (container) => {
    return ky.create(config);
  });
  sl.factory('userService', (container) => {
    return new UserSerivce({ client: container.client })
  });
}

export const $sl = sl.container;
export default {
  init,
}