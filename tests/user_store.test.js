
import createUserStore from "../src/js/store/user";
import UserSerivce from "../src/js/api/user/UserService";
import UserModel from "../src/js/api/user/UserModel";
import ky from 'ky';

describe('UseStore', ()=>{
  const userData = { id: 1, name: "admin" };
  const response = {
    status: 200,
    json: () => Promise.resolve(userData)
  };

  jest.spyOn(ky, 'get').mockImplementation(() => Promise.resolve(response));

  const mockUserService = new UserSerivce({client: ky })
  const userStore = createUserStore({ userService: mockUserService });
  
  jest.spyOn(UserSerivce.prototype, 'getCurrent').mockImplementation(() => UserModel.FromJson(userData));

  it('User must be equal', async () => {
    await userStore.init();
    expect(userStore.data).toEqual(UserModel.FromJson(userData));
  });

});
