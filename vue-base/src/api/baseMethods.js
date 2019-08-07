import BaseHttp from './http'
import {
  stringify
} from 'qs'


class BaseMethods extends BaseHttp {
  constructor(module) {
    super(module);
  }
  // 序列化data
  post(url, data) {
    return this.exec(this.instance.post(url, data))
  }
  get(url, params) {
    return this.exec(this.instance.get(url, {
      params
    }))
  }
  put(url, data) {
    return this.exec(this.instance.put(url, stringify(data)))
  }
  // 参数当做 java对象来封装接收{data:data}, 参数当做url 参数接收, 如www.baidu.com?a=xx, {params:data}
  delete(url, data) {
    return this.exec(this.instance.delete(url, {
      data
    }))
  }
}

export default BaseMethods
