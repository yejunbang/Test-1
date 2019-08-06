const Server = require('ws').Server

// server端需要安装ws模块
// websocket的H5标准，所有兼容性差，以前的不兼容，使用socket.io兼容性好

const ws = new Server({
  port: 9000
})

let interval
ws.on('connection', function (socket) {
  socket.on('message', function (msg) {
    console.log('====output==接收到客户端消息==>>>', msg);
    interval = setInterval(function () {
      socket.send('收到了，老哥')
    }, 60 * 60 * 2000)
  })
})

ws.on('disconnect', function () {
  clearInterval(interval)
})

module.exports = ws