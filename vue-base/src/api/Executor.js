import {
  Loading,
  Message
} from 'element-ui';
const loadingSyb = Symbol('loading')
const msgSyb = Symbol('message')
const nativeSyb = Symbol('native')

const tip = (msg, type = 'error') => {
  Message({
    message: msg,
    duration: 3000,
    showClose: true,
    type
  });
}

const LoadingOption = {
  lock: true,
  text: 'Loading',
  spinner: 'el-icon-loading',
}

class Executor {
  constructor() {
    this.reset()
  }
  reset() {
    this[msgSyb] = {
      error: '系统错误'
    }
    this[loadingSyb] = false
    this[nativeSyb] = false
  }
  msg(success, error = '系统错误') {
    this[msgSyb] = {
      success,
      error
    }
    return this
  }
  loading() {
    this[loadingSyb] = true
    return this
  }
  // 想要获取系统提供的错误信息, 使用此方法会返回错误信息给具体业务处理
  native() {
    this[nativeSyb] = true
    return this
  }
  // 默认错误提示: 系统错误
  exec(promise) {
    let loading
    this[loadingSyb] && (loading = Loading.service(LoadingOption))
    return new Promise((resolve, reject) => {
      promise.then(data => {
          (this[loadingSyb] && loading) && (loading.close())
          (this[msgSyb].success) && (tip(this[msgSyb].success, 'success'))
          this.reset()
          return resolve(data)
        })
        .catch(error => {
          (this[loadingSyb] && loading) && (loading.close())
          tip(this[msgSyb].error)
          this.reset()
          if (this[nativeSyb]) {
            return reject(error)
          }
        })
    })
  }
}

export default Executor;
