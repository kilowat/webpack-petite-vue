
import UserModel from '../src/js/api/user/UserModel';
import UserSerivce from '../src/js/api/user/UserService';
import ky from 'ky';



describe('UserService', ()=>{
  const userData = { id: 1, name: "admin" };
  const response = {
    status: 200,
    json: () => Promise.resolve(userData)
  };

  jest.spyOn(ky, 'get').mockImplementation(() => Promise.resolve(response));

  const userService = new UserSerivce({ client: ky })

  test('Get user data from server', async () => {
    const user = await userService.getCurrent();
    expect(user).toEqual(UserModel.FromJson(userData));
  });
});
