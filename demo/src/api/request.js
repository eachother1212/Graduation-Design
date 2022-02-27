// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// start:代表进度条开始 done代表进度条结束
// 引入进度条的样式
import 'nprogress/nprogress.css'
import store from '@/store'
// 1.利用axios对象的方法create去创建np一个axios的实例
// 2. request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径当中会出现api
  baseURL: '/api',
  // 请求超时的时间
  timeout: 5000,
})
// 请求拦截器，在发送请求之前，请求拦截器可以检测到，可以在请求发送之前做一些事情
requests.interceptors.request.use((config) => {
  // config 是一个配置对象，对象里面有一个属性很重要,header请求头
  // 进度条开始
  if (store.state.detail.uuid_token) {
    // 给请求头加一个字段
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  nprogress.start()
  return config
})
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 进度条结束
    nprogress.done()
    // 服务器请求成功的回调函数，服务器响应数据回来以后，响应拦截器可以检测到，可以做一些事情
    return res.data
  },
  (error) => {
    // 服务器请求失败的回调
    return Promise.reject(new Error('faile'))
  }
)
export default requests
