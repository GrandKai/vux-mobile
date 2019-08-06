import axios from 'axios'
import {vue} from '@/main'

const baseURL = process.env.API_URL

axios.defaults.timeout = 2 * 60 * 1000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8' // 配置请求头
axios.defaults.baseURL = baseURL

axios.defaults.retry = 1 // 重试次数
axios.defaults.retryDelay = 1000 // 重试延时
axios.defaults.shouldRetry = _ => true // 重试条件，默认只要是错误都需要重试

// 1. 请求拦截
axios.interceptors.request.use(
  config => {
    // console.warn('1. axios request 请求前拦截: config: ', config)
    // 设置请求默认配置
    config['headers'] = config.headers ? config.headers : {}
    config['method'] = config.method ? config.method : 'post'
    config['data'] = config.data ? config.data : {}
    // 设置 token
    const token = sessionStorage.getItem('accessToken')
    if (token) config.headers.Authorization = `Bearer ${token}`
    // 在发起请求请做一些业务处理
    return config
  },
  error => {
    // console.warn('2. axios request 请求前 rejected 拦截: error:', error)
    // 对请求失败做处理
    return Promise.reject(error)
  })

// 2. 响应拦截
axios.interceptors.response.use(
  response => {
    // console.warn('3. axios response 拦截: response: ', response)
    // 请求是 200 是正常的响应，非 200 是失败的响应
    if (response.status === 200) {
      let data = response.data
      if (data.code === 200) {
        return Promise.resolve(data)

        // 1002: 无效的[accessToken]!, 1003: 过期的[accessToken]!
      } else if ([1002, 1003].includes(data.code)) {
        // accessToken 过去
        console.error('accessToken 过期，清除 sessionStorage 的 accessToken')
        sessionStorage.setItem('accessToken', '')
      } else {
        showErrorToast(data.message)
      }
    } else {
      showErrorToast('响应异常！')
    }
    // 对响应数据做处理
    return response
  },
  error => {
    // console.warn('4. axios response error 拦截: error: ', error)
    // 对响应错误做处理
    let config = error.config
    // 判断是否配置了重试
    if (!config || !config.retry) return Promise.reject(error)

    if (!config.shouldRetry || typeof config.shouldRetry !== 'function') {
      return Promise.reject(error)
    }

    // 判断是否满足重试条件
    if (!config.shouldRetry(error)) {
      return Promise.reject(error)
    }

    // 设置重置次数，默认为0
    config.__retryCount = config.__retryCount || 0

    // 判断是否超过了重试次数
    if (config.__retryCount >= config.retry) {
      return Promise.reject(error)
    }

    // 重试次数自增
    config.__retryCount += 1

    // 延时处理
    let backOff = new Promise(resolve => {
      setTimeout(_ => resolve(), config.retryDelay || 1)
    })

    // 重新发起 axios 请求
    return backOff.then(_ => axios(config))
  })

// eslint-disable-next-line
function showErrorToast (message) {
  // 显示错误信息
  vue.$vux.toast.show({
    text: message,
    type: 'warn',
    position: 'middle',
    'isShowMask': false
  })
}

export default axios
