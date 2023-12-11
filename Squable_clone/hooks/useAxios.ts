
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
// import { store } from "../store/index";

const instance: AxiosInstance = axios.create({
  baseURL: "https://devsytes.com/mobileapi",
  timeout: 1000,
  headers: { "Content-Type": "application/json" }
});

instance.interceptors.request.use((config: AxiosRequestConfig) => {
  // const token = store.getState().UserReducer.userData.auth_token;
  // config.headers.Authorization = "token";
  // console.log("token", token);
  axios.defaults.headers.common['Authorization'] = "token";
  // console.log("request", config);
  return config;
});

export default instance;
