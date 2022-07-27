import ky from "ky";

const config = {
  prefixUrl: 'https://my-json-server.typicode.com/kilowat/json_dummy'
};

const client = ky.create(config);

export default client;


