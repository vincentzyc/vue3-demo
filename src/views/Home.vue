<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld :msg="msg" />
    <button @click="updatePropsMsg()">update props msg</button>
  </div>
</template>
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { ref } from 'vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup() {
    const msg = ref("Welcome to Your Vue.js App")
    // const vm = getCurrentInstance();
    function updatePropsMsg() {
      msg.value = msg.value + " ha";
    }
    return {
      msg,
      updatePropsMsg
    }
  }
}
</script>
