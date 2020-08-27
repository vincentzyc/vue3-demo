<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <p>以下是自定义全局组件</p>
    <div style="margin-bottom:20px">
      <YuiButton></YuiButton>
    </div>
    <div style="margin-bottom:20px">
      <YuiSelect></YuiSelect>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
});
</script>
