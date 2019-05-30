import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
const CancelToken = axios.CancelToken;

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})
// 异常状态码判断
const errorHanle = (state,other) => {
  switch(status) {
    case 401:
      // token
      break;
    case 1001:
      // 登录失效
      break;
    default:
    console.log(other)   
  }
}
// request拦截器
service.interceptors.request.use(
  // 需要设置头部信息
  config => {
    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken()
    // }
    return config
  },
  error => Promise.reject(error)
)

// response 拦截器
service.interceptors.response.use(

  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error;
    if(response) {
      errorHandle(response.status,response.data.message)
      return Promise.reject(response);
    }else{
      // 断网了
      ScreenOrientation.commit('changeNetWork',false)
    }
  }
)

export default service



