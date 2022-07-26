
import UserModel from '../src/js/api/user/UserModel';
import UserSerivce from '../src/js/api/user/UserService';

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
const mockUser = { id: 1, name: "admin" };
mock.onGet("/user").reply(200, mockUser);

const userService = new UserSerivce(axios);

test('User must be equal', async () => {
  const user = await userService.getCurrent();
  expect(user).toEqual(UserModel.FromJson(mockUser));
});
