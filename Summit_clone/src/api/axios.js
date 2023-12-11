import axios from 'axios';

const client = axios.create({
  baseURL: 'https://summitapi.kmstech.io/api',
});

export default client;
