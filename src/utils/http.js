import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import router from '../router';
const CancelToken = axios.CancelToken;

// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api 的 base_url
  //baseURL:'http://192.168.3.195:8000',
  baseURL:'http://192.168.3.201:8000',
  timeout: 5000 // 请求超时时间
})
// 异常状态码判断
const errorHandle = (status,message) => {
  switch(status) {
    case 401:  // 登录失效
      Message({
        message:message,
        type:'error',
        duration:1500
      })
      setTimeout(() => {
        router.push({path:'/login'})
        // 需要删除一些登录的时候绑定的东西 并且刷新页面
        location.reload()
      },1000)
      break;
    case 1001:
      // 登录失效
      break;
    default:
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
        Message({
          message:res.data.message,
          type:'error'
        })
        return Promise.reject('error')
      }else{
        return Promise.resolve(res.data)
      }
    }else{
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    const { response } = error;
    if(response) {
      errorHandle(response.status,response.data.message)
      return Promise.reject(response);
    }else{
      // 断网了
      // 先关闭所有的message碳层 =》 只显示最后一层
      Message.closeAll();
      Message({
        message:'网络超时,请检查网络！',
        type:'error'
      })
      // ScreenOrientation.commit('changeNetWork',false)
    }
  }
)
export default service



