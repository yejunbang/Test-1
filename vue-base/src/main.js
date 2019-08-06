// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueSocketIo from 'vue-socket.io'
import SocketIo from 'socket.io-client'

Vue.config.productionTip = false

Vue.use(new VueSocketIo({
  connection: SocketIo('http://localhost:3000')
}))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
