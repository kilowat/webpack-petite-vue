import ky from "ky";

const config = {
  prefixUrl: 'https://my-json-server.typicode.com/kilowat/json_dummy'
};

const kyClient = ky.create(config);

export default {
  async get( url ){
    return await kyClient.get(url);
  },
  async post( url ){
    return await kyClient.post(url);
  }
};


