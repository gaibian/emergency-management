import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import router from '../router';
const CancelToken = axios.CancelToken;

// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api 的 base_url
  baseURL:'http://192.168.3.201:8000',
  timeout: 5000 // 请求超时时间
})
// 异常状态码判断
const errorHandle = (state,other) => {
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
    if (store.getters.token) {
      config.headers['authorization'] = getToken()
    }
    return config
  },
  error => Promise.reject(error)
)
// response 拦截器
service.interceptors.response.use(
  //res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
  res => {
    if(res.status === 200) {
      if(res.data.code === -1) {
        this.$message({
          message:res.message,
          type:'error'
        })
      }else{
        return Promise.resolve(res.data)
      }
    }else if(res.status === 401){
        // 跳转到登录页
        router.push({path:'/login'})
        // 需要清除一些登录信息 并刷新页面
    }else{
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    // console.log('进去了吗')
    const { response } = error;
    console.log(response)
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



