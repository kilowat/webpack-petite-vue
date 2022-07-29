import UserModel from './UserModel';
import client from '../client';

export default class UserSerivce{
  /**
   * @param { Object } param
   * @param { client } param.client
   */
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

function required(name) {
  throw Error(`Argument ${name} is required`);
}