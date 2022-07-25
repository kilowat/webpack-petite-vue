import UserSerivce from '../src/js/api/user/UserService';
var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/user").reply(200, {
  user: { id: 1, name: "admin" },
});

const userService = new UserSerivce(axios);

describe("UserService", function () {
  it("getCurrentUser should return user with id 1", async function (){
    const user = await userService.getCurrent();
    expect(user.id).toEqual(1);
  });
});