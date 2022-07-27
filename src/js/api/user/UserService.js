import UserModel from './UserModel';

export default class UserSerivce{
  constructor({ 
    client = required('client')
   }) {
    this.client = client;
  }

  async getCurrent() {
    const response = await this.client.get('user');

    if (response.status !== 200) {
      throw Error('Server error');
    }

    const data = await response.json();
    return UserModel.FromJson(data);
  }
}

function required(name){
  throw Error(`Argument ${name} is required`);
}