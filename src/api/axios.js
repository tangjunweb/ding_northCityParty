import axios from 'axios'
import Qs from 'qs'

axios.defaults.baseURL = process.env.BASE_API
// request拦截器
axios.interceptors.request.use(
  // config => {
  //   if (store.getters.token) {
  //     config.headers['Authorization'] =  ""// 让每个请求携带自定义token 请根据实际情况自行修改
  //   }
  //   return config
  // },
  // error => {
  //   // Do something with request error
  //   console.log(error) // for debug
  //   Promise.reject(error)
  // }
)

// response 拦截器
axios.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if(response.status == 200){
      return Promise.resolve(response.data)
    }else {
      return Promise.reject(response.data)
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default axios