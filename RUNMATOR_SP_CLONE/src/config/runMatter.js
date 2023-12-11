import axios from "axios";
import keys from "./keys.json"
const RunMatter=axios.create({
    baseURL:keys.baseUrl,
    headers:{
        Authorization: 'Bearer 28|zfYLBDgYy2Lb8oY1j4LqimqwuLzCjSHNhRSJzcpt',
        Accept: 'application/json',
      }
})

export default RunMatter