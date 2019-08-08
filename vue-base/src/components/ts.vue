<template>
  <div>
    <input v-model="input" />><button @click="getProduct">获取数据</button>
    <p>{{ data }}</p>
  </div>
</template>

<script lang="ts">
import { getFood } from "../ts/getFood";

export default {
  name: "HelloWorld",
  data() {
    return {
      // messages: messages
      input: 0,
      data: []
    };
  },
  methods: {
    async getProduct() {
      this.data = getFood(this.input);
      console.log("====output====>>>", this.data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
