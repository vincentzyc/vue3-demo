<template>
  <div class="home text-center">
    <header v-pin:[direction]="pinPadding" style="width:100%;text-align:center" class="max640">
      <p>
        Stick me
        <span style="color:red">{{pinPadding}}</span>
        px from the {{ direction }} of the page
      </p>
    </header>

    <p class="cred mg20">{{time}}</p>

    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <p class="mg10">以下是自定义全局组件</p>
    <div class="mg-b20">
      <YuiButton @click="handleClick()">自定义全局按钮</YuiButton>
    </div>
    <div class="mg-b20">
      <YuiSelect></YuiSelect>
    </div>
    <div class="mg-b20 flex flex-center">
      自定义指令：
      <input type="range" min="0" max="500" v-model="pinPadding" style="z-index:9" />
    </div>
    <Button type="success">成功按钮</Button>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { Dialog, Button } from "vant";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    Button,
  },
  data() {
    return {
      direction: "top",
      pinPadding: 40,
      time: "",
      timer: 0,
    };
  },
  methods: {
    handleClick() {
      Dialog({
        title: "标题",
        message: "这是一个全局按钮组件",
      });
    },
    initTime() {
      this.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      this.timer = setInterval(() => {
        this.time = dayjs().format("YYYY-MM-DD HH:mm:ss");
      }, 1000);
    },
  },
  created() {
    this.initTime();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
});
</script>
