import UserModel from './UserModel';

export default class UserSerivce{
  constructor(client){
    this.client = client;
  }
  async getCurrent() {
    const response = await this.client.get('/user');

    if (response.status !== 200) {
      throw Error('Server error');
    }
 
    return UserModel.FromJson(response.data.user);
  }
}
