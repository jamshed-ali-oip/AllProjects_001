import axios from "axios";
import {apiUrl} from "./config"
const RunMatter=axios.create({
    baseURL:apiUrl,
    headers:{
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      }
})

export default RunMatter