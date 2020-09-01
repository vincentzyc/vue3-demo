<template>
  <div class="home">
    <header v-pin:[direction]="pinPadding" style="width:100%;text-align:center">
      <p>
        Stick me
        <span style="color:red">{{pinPadding}}</span>
        px from the {{ direction }} of the page
      </p>
    </header>

    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <p>以下是自定义全局组件</p>
    <div style="margin-bottom:20px">
      <YuiButton @click="handleClick()">自定义全局按钮</YuiButton>
    </div>
    <div style="margin-bottom:20px">
      <YuiSelect></YuiSelect>
    </div>
    <div style="margin-bottom:20px">
      <input type="range" min="0" max="500" v-model="pinPadding" />
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
  data() {
    return {
      direction: "top",
      pinPadding: 15,
    };
  },
  methods: {
    handleClick() {
      alert("这是一个全局按钮组件");
    },
  },
});
</script>
