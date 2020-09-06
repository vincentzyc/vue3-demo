<template>
  <div id="nav" class="max640">
    <ul class="tabbar flex align-middle">
      <li class="tabbar-item flex flex-auto justify-center">
        <router-link to="/">Home</router-link>
      </li>
      <li class="tabbar-item flex flex-auto justify-center">
        <router-link to="/about">About</router-link>
      </li>
      <li class="tabbar-item flex flex-auto justify-center">
        <router-link to="/todoList">ToDo</router-link>
      </li>
      <li class="tabbar-item flex flex-auto justify-center">
        <router-link to="/luckdraw">LuckDraw</router-link>
      </li>
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
}
</style>