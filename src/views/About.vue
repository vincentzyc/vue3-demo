<template>
  <div ref="root">
    <p>This is a root element</p>
    <div class="flex flex-column">
      <div class="flex flex-center mg-t10">
        <label>姓名：</label>
        <input ref="nameinput" v-model.trim="formData.name" maxlength="16" />
      </div>
      <div class="flex flex-center mg-t10">
        <label>手机号：</label>
        <input type="tel" v-model.trim="formData.phone" maxlength="11" />
      </div>
      <div class="flex flex-center mg-t10">
        <label>验证码：</label>
        <input type="tel" v-model.trim="formData.code" maxlength="6" />
      </div>
    </div>
    <p class="mg-t10">{{formData}}</p>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";

export default {
  setup() {
    const nameinput = ref();
    const formData = reactive({
      name: "",
      phone: "",
      code: "",
    });

    onMounted(() => {
      (nameinput.value as HTMLInputElement).focus();
    });

    return {
      nameinput,
      formData,
    };
  },
};
</script>