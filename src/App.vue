<template>
  <div class="wrapper">
    <YunFooter></YunFooter>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import YunFooter from "@/components/YunFooter.vue";

export default defineComponent({
  name: "App",
  components: {
    YunFooter,
  },
});
</script>

<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.max640{
  max-width 640px;
  margin auto
}
</style>
