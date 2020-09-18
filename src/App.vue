<template>
  <div class="wrapper">
    <YunFooter></YunFooter>
    <transition name="van-fade">
      <router-view />
    </transition>
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