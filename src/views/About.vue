<template>
  <div class="about">
    <h1>state.count is: {{ state.count }}</h1>
    <h2>state.double is: {{ state.double }}</h2>
    <h2>count is: {{ count }}</h2>
    <button @click="increment()">add</button>
  </div>
</template>

<script>
import { reactive, ref, computed, watch } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })
    const count = ref(0)

    function increment() {
      state.count++
      count.value++
    }

    watch(
      () => state.double,
      val => { console.log(`count is ${val}`) }
    )

    return {
      state,
      count,
      increment
    }
  }
}
</script>