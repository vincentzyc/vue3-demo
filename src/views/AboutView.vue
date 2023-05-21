<template>
  <div ref="root" class="text-center">
    <van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
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
    <p class="mg-t10">{{ formData }}</p>
    <van-button type="primary" @click="insertName()">姓名插入哈哈</van-button>
    <van-steps direction="vertical" :active="1">
      <van-step>
        <h3>商品已下单</h3>
        <p>{{ twoNow }}</p>
      </van-step>
      <van-step>
        <h3>快件已被揽收</h3>
        <p>{{ now }}</p>
      </van-step>
      <van-step>
        <h3>快件已发货</h3>
        <p>{{ now2 }}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { ref, reactive, onMounted } from "vue";

const root = ref();
const nameinput = ref();
const twoNow = dayjs().subtract(2, "day").format("YYYY-MM-DD HH:mm:ss");
const now = dayjs().format("YYYY-MM-DD HH:mm:ss");
const now2 = dayjs().add(2, "day").format("YYYY-MM-DD HH:mm:ss");
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
}
</script>