import Bottle from "bottlejs";
import UserSerivce from "./api/user/UserService";
import client from "./api/client";

// Service locator
const sl = new Bottle();

export const init = () => {
  sl.factory('userService', (container) => {
    return new UserSerivce({ client })
  });
}

export const $sl = sl.container;

export default {
  init,
}