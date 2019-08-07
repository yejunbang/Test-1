/**
 * 对axios的封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
// import store from '../store/index';
import Executor from './executor';
import {
  Message
} from 'element-ui'

const tip = (msg, type = 'error') => {
  Message({
    message: msg,
    duration: 3000,
    showClose: true,
    type
  });
}

/**
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath //携带当前路径, 登陆成功后跳回去
    }
  });
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, data) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
      // 403 token过期
      // 清除token并跳转登录页
    case 403:
      tip('登录过期，请重新登录');
      localStorage.removeItem('token');
      // store.commit('setToken', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
      // 404请求不存在
    case 404:
      tip('请求的资源不存在');
      break;
    default:
      tip(`code: ${data.code} ${data.message}`);
  }
}

class BaseHttp extends Executor {
  constructor(module) {
    super()
    // 创建axios实例
    this.instance = axios.create({
      timeout: 1000 * 60,
      baseURL: module,
      // 对'PUT', 'POST', and 'PATCH'方法序列化url参数
      transformRequest: [function (data) {
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }],
    });
    // 设置post请求头
    // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    this.instance.defaults.headers.post['Content-Type'] = 'application/json';
    // instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    this.instance.interceptors.request.use(
      config => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        // if (store.getters.token) {
        //   // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
        //   config.headers['X-Token'] = getToken()
        // }
        config.headers = {
          // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          'Content-Type': 'application/json;charset=UTF-8'
        }
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        return config;
      },
      error => Promise.reject(error))

    this.instance.interceptors.response.use(
      // 请求成功
      res => res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res),
      // 请求失败
      error => {
        const {
          response
        } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          errorHandle(response.status, response.data);
          return Promise.reject(response);
        }
      });
  }
}

export default BaseHttp;
