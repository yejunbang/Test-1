<template>
  <div>
    <button @click="getProduct">获取数据</button>
    <p>{{ data }}</p>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        // messages: messages
        data: ''
      }
    },
    methods: {
      async getProduct() {
        this.data = await this.$api.product.getProduct(123456)
        console.log('====output====>>>', this.data);
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
