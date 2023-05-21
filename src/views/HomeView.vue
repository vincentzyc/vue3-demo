<template>
  <div class="home text-center">
    <header v-pin:[direction]="pinPadding" style="width: 100%; text-align: center" class="max640">
      <p>
        Stick me
        <span class="text-color">{{ pinPadding }}</span>
        px from the {{ direction }} of the page
      </p>
    </header>

    <p class="mg20 text-color">{{ time }}</p>

    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <p class="mg10 text-color">以下是自定义全局组件</p>
    <div class="mg-b20">
      <YuiButton @click="handleClick()">自定义全局按钮</YuiButton>
    </div>
    <div class="mg-b20">
      <YuiSelect></YuiSelect>
    </div>
    <div class="mg-b20 flex flex-center">
      自定义指令：
      <input type="range" min="0" max="500" v-model="pinPadding" style="z-index: 9" />
    </div>
    <van-button type="success" @click="changeColor">更改字体颜色</van-button>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import { showDialog, showToast } from "vant";

export default defineComponent({
  name: "HomePgae",
  components: {
    HelloWorld,
  },
  data() {
    return {
      direction: "top",
      pinPadding: 0,
      time: "",
      timer: 0,
      color: "red",
      city: ["", "", ""],
    };
  },
  methods: {
    changeColor() {
      showToast("字体颜色已改蓝色");
      this.color = "blue";
    },
    handleClick() {
      showDialog({
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

<style>
.text-color {
  color: v-bind(color);
}
</style>
