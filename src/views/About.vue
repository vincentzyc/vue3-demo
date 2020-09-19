<template>
  <div ref="root" class="text-center">
    <p class="mg20">This is a root element</p>
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
    <Button type="primary" @click="insertName()">姓名插入哈哈</Button>
    <Steps :active="1">
      <Step>买家下单</Step>
      <Step>商家接单</Step>
      <Step>买家提货</Step>
      <Step>交易完成</Step>
    </Steps>
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Button, Step, Steps } from "vant";

export default {
  components: {
    Button,
    Step,
    Steps,
  },
  setup() {
    const nameinput = ref();
    const selectionStart = ref(0);
    const formData = reactive({
      name: "",
      phone: "",
      code: "",
    });

    onMounted(() => {
      (nameinput.value as HTMLInputElement).focus();
    });

    const insertName = () => {
      const index = (nameinput.value as HTMLInputElement).selectionStart;
      if (typeof index !== "number") return;
      formData.name =
        formData.name.slice(0, index) + "哈哈" + formData.name.slice(index);
    };

    return {
      nameinput,
      formData,
      insertName,
      selectionStart,
    };
  },
};
</script>