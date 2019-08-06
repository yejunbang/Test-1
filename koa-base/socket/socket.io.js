const socket = require('socket.io')
// 服务端需要下面的配置
// 但是客户端就不同：需要install vue-socket.io和socket.io-client 
// 然后Vue.use(new vue-socket.io({connection:socket.io-client('http://localhost:3000')}))
// 之后就可以很方便使用了：this.$socket.send('这是客户端发来的，老弟') this.$socket.emit('say', '这是自定义方法，老弟')...
// 监听：sockets: {message(msg) {console.log('====output====>>>', msg);this.messages.push(msg)}}

let socketServer

function setServer(server) {
  socketServer = socket.listen(server)
}

function runSocketIo() {
  let interval
  socketServer.on('connection', function (socket) {
    socket.on('message', function (msg) {
      console.log('====output==socket io===接收到客户端发来的消息=>>>', msg);
    })
    interval = setInterval(function () {
      socket.send('注意：这是服务端推送的消息!!!')
    }, 60 * 60 * 2000)
    socket.on('say', function (msg) {
      console.log('====output===这是接收客户端自定义的方法=>>>', msg);
    })
  })
  socketServer.on('disconnect', function () {
    clearInterval(interval)
  })
}

module.exports = {
  setServer,
  runSocketIo
}