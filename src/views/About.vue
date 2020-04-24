<template>
  <div class="about">
    <div style="border:1px dashed #333;margin:10px;padding:10px">
      <h1>state.count is: {{ state.count }}</h1>
      <h2>state.double is: {{ state.double }}</h2>
      <h2>count is: {{ count }}</h2>
      <button @click="increment()">add</button>
    </div>

    <div style="border:1px dashed #333;margin:10px;padding:10px">
      <h1>vuex state storeTest：</h1>
      <h1>{{storeTest}}</h1>
      <button @click="updateStoreTest()">updateStoreTest</button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed, watch, getCurrentInstance } from 'vue'

export default {
  setup() {
    const { ctx } = getCurrentInstance();  //ctx 当前组件的实例，类似2.x的this
    console.log(ctx)

    // ctx.$router 是 Vue Router 实例，里面包含了 currentRoute 可以获取到当前的路由信息
    console.log(ctx.$router.currentRoute.value)


    // Vuex 的语法和 API 基本没变
    const storeTest = computed(() => ctx.$store.state.storeTest)
    const updateStoreTest = () => {
      count.value++
      ctx.$store.commit('setStoreTest', 'hello world' + count.value);
      console.log(storeTest.value);
    }

    const state = reactive({
      count: 0,
      double: computed(() => state.count * 2)
    })
    const count = ref(0)

    const increment = () => {
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
      increment,
      storeTest,
      updateStoreTest
    }
  }
}
</script>