import requests from './httpService'
import { AxiosResponse } from 'axios'

const Services = {
  getAll({ query }){
    return requests.get(`/posts`)
  },
  getById(id){
    return requests.get(`/categories/${id}`)
  },
  add(body){
    return requests.post('/categories', body)
  },
  update(id){
    return requests.put(`/categories/${id}`, body)
  },
  delete(id){
    return requests.delete(`/categories/${id}`)
  }
}

export default Services
