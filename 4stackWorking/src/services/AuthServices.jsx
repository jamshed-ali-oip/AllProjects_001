
import { AxiosResponse } from 'axios'
// import { IUser } from 'src/types/apps/user';
import requests from './httpService';

const AuthServices = {
  login(body) {
    return requests.post(`/auth/signin`, body);
  },
  signup(body) {
    return requests.post(`/auth/signup`, body);
  },
  profileUpdate(id, body) {
    return requests.put(`/auth/users/${id}`, body);
  },
  me() {
    return requests.get(`/auth/me`);
  }
};

export default AuthServices;
