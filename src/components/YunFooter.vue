<template>
  <div id="nav" class="max640">
    <ul class="tabbar flex">
      <router-link to="/" class="tabbar-item flex flex-center">Home</router-link>
      <router-link to="/about" class="tabbar-item flex flex-center">About</router-link>
      <router-link to="/todoList" class="tabbar-item flex flex-center">ToDo</router-link>
      <router-link to="/luckdraw" class="tabbar-item flex flex-center">LuckDraw</router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "YunFooter",
});
</script>

<style lang="stylus" scoped>
#nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #e7e7e7;
}

.tabbar {
  height: 50px;
}

.tabbar-item {
  height: 100%;
  color: #666;
  flex: 1 0 25%;
}

.tabbar-item:not(:last-child) {
  border-right: 1px solid #e7e7e7;
}

.router-link-active {
  color: #409eff;
}
</style>