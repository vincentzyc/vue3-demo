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
    <button @click="goHome()">go /home</button>
  </div>
</template>

<script>
import { reactive, ref, computed, watch, getCurrentInstance } from 'vue'
import router from '../router'
import store from '../store'

export default {
  setup() {
    const { ctx } = getCurrentInstance();  //ctx 当前组件的实例，类似2.x的this
    console.log(ctx)

    // ctx.$router 是 Vue Router 实例，里面包含了 currentRoute 可以获取到当前的路由信息
    // 注意：ctx.$router 方式通过 npm run build 打包后获取不到 router ，估计是bug，待官方修复
    // console.log(ctx.$router.currentRoute)
    // 可以通过导入router代替
    console.log(router);

    const goHome = () => {
      router.push('/home')
    }

    // Vuex 的语法和 API 基本没变
    // 注意：ctx.$store 方式通过 npm run build 打包后获取不到 store ，估计是bug，待官方修复
    // const storeTest = computed(() => ctx.$store.state.storeTest)
    // 可以通过导入vuex代替
    console.log(store);

    const storeTest = computed(() => store.state.storeTest)
    const updateStoreTest = () => {
      count.value++
      store.commit('setStoreTest', 'hello world' + count.value);
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
      updateStoreTest,
      goHome
    }
  }
}
</script>