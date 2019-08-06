<template>
  <div>
    <h1>以下时websocket消息：</h1>
    <ul>
      <li v-for="(msg,index) in messages" :key="`${msg}_${index}`">{{msg}}</li>
    </ul>
  </div>
</template>

<script>
  const messages = []
  const ws = new WebSocket('ws://localhost:9000')
  ws.onopen = function () {
    ws.send('接收到了，老弟')
  }
  ws.onmessage = function (res) {
    console.log('====output==接收到服务器消息==>>>', res.data);
    messages.push(res.data)
  }
  export default {
    name: 'HelloWorld',
    data() {
      return {
        messages: messages
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
