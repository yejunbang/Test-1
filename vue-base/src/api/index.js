import product from './module/product'

const api = {
  product
}

export default {
  install(vm) {
    vm.prototype.$api = api
  }
}

/**
 * 使用教程:
 * 比如call sailingProduct api
 * this.$api.sailingProduct.post(data)
 * 如果想要loading效果或自定义错误message:
 * this.$api.sailingProduct.loading().msg(null,'自定义错误信息').post(data)
 */
