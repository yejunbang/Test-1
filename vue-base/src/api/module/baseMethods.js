import instance from '../http'
import Executor from '../Executor'
import {
  stringify
} from 'qs'


class BaseMethods extends Executor {
  constructor(domain, module) {
    super();
    // instance.defaults.baseURL = domain
    this.module = module
  }
  // 序列化data
  post(data) {
    return this.exec(instance.post(this.module, stringify(data)))
  }
  get(params) {
    return this.exec(instance.get(this.module, {
      params
    }))
  }
  put(data) {
    return this.exec(instance.put(this.module, stringify(data)))
  }
  // 参数当做 java对象来封装接收{data:data}, 参数当做url 参数接收, 如www.baidu.com?a=xx, {params:data}
  delete(data) {
    return this.exec(instance.delete(this.module, {
      data
    }))
  }
}

export default BaseMethods
