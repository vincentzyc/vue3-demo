<template>
  <button>
    <slot>按钮</slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "YuiButton",
});
</script>
