<template>
  <div>
    <button @click="sendMsg">发送消息给服务端</button>
    <button @click="customSendMsg">自定义方法发送消息给服务端</button>
    <h1>以下时websocket消息：</h1>
    <ul>
      <li v-for="(msg,index) in messages" :key="`${msg}_${index}`">{{msg}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        // messages: messages
        messages: []
      }
    },
    sockets: {
      message(msg) {
        console.log('====output====>>>', msg);
        this.messages.push(msg)
      }
    },
    methods: {
      sendMsg() {
        this.$socket.send('这是客户端发来的，老弟')
      },
      customSendMsg() {
        this.$socket.emit('say', '这是自定义方法，老弟')
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
