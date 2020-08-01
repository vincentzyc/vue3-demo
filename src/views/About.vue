<template>
  <div ref="root">
    <p>This is a root element</p>
    <input ref="todoinput" v-model="model" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const root = ref(null)
    const todoinput = ref(null)
    const model = ref('')


    onMounted(() => {
      console.log(root.value)
      todoinput.value.focus()
    })

    return {
      root,
      todoinput,
      model
    }
  }
}
</script>