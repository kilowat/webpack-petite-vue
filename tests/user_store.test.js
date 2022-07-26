
import createUserStore from "../src/js/store/user";
import UserSerivce from "../src/js/api/user/UserService";
import UserModel from "../src/js/api/user/UserModel";

const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mockClient = new MockAdapter(axios);
const mockUser = { id: 1, name: "admin" };
mockClient.onGet("/user").reply(200, {
  user: mockUser,
});
const mockUserService = new UserSerivce({client: mockClient })
const userStore = createUserStore({ userService: mockUserService });

beforeAll(() => {
  jest.spyOn(UserSerivce.prototype, 'getCurrent').mockImplementation(() => UserModel.FromJson(mockUser));
});

test('User must be equal', async () => {
  await userStore.init();
  expect(userStore.data).toEqual(UserModel.FromJson(mockUser));
});
