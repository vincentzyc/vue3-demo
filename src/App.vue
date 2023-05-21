<template>
  <div class="wrapper">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <van-tabbar placeholder route v-show="showFooter">
      <van-tabbar-item icon="home-o" replace to="/">Home</van-tabbar-item>
      <van-tabbar-item icon="search" replace to="/about">About</van-tabbar-item>
      <van-tabbar-item icon="friends-o" replace to="/todoList">ToDo</van-tabbar-item>
      <van-tabbar-item icon="setting-o" replace to="/luckdraw">LuckDraw</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'App',
  setup() {
    const routr = useRoute();
    const showFooter = computed(() => routr.path.split('/').length < 3);
    return {
      showFooter,
    };
  },
});
</script>
