<template>
  <div class="about">
    <h1>state.count is: {{ state.count }}</h1>
    <h2>state.double is: {{ state.double }}</h2>
    <h2>count is: {{ count }}</h2>
    <button @click="increment()">add</button>
  </div>
</template>

<script>
import { reactive, ref, computed, watch, getCurrentInstance } from 'vue'

export default {
  setup() {
    const { ctx } = getCurrentInstance();  //ctx 当前组件的实例，类似2.x的this
    console.log(ctx)
    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })
    const count = ref(0)

    const increment = () => {
      state.count++
      count.value++
      // ctx.$router 是 Vue Router 实例，里面包含了 currentRoute 可以获取到当前的路由信息
      console.log(ctx.$router.currentRoute.value)
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