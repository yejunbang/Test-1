import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/websocket',
      name: 'Websocket',
      component: () => import('../components/socket/webSocket.vue')
    },
    {
      path: '/socketIo',
      name: 'SocketIo',
      component: () => import('../components/socket/socket.io.vue')
    }
  ]
})
