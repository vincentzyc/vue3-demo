import { ref } from "vue";
import { defineComponent } from 'vue';
import { Field } from "vant";
// import areaList from '@/assets/js/area';

export default defineComponent({
  setup() {
    const text = ref('')
    const tel = ref('')
    const digit = ref('')
    const number = ref('')
    const password = ref('')
    // const onSave = () => {
    //   Toast('save')
    // }
    // const onDelete = () => {
    //   Toast('delete')
    // }
    // let searchResult: {
    //   address: string;
    //   name: string;
    // }[] = reactive([])

    // const onChangeDetail = (val: any) => {
    //   if (val) {
    //     searchResult = [
    //       {
    //         name: '黄龙万科中心',
    //         address: '杭州市西湖区',
    //       },
    //     ]
    //   } else {
    //     searchResult = [];
    //   }
    // }
    return () => (
      <div class="mg20">
        {/* <!-- 输入任意文本 --> */}
        <Field vModel={text.value} label="文本" placeholder="请输入文本"/>
        {/* <!-- 输入手机号，调起手机号键盘 --> */}
        <Field vModel={tel.value} type="tel" label="手机号" placeholder="请输入手机号"/>
        {/* <!-- 允许输入正整数，调起纯数字键盘 --> */}
        <Field vModel={digit.value} type="digit" label="整数" placeholder="请输入整数"/>
        {/* <!-- 允许输入数字，调起带符号的纯数字键盘 --> */}
        <Field vModel={number.value} type="number" label="数字" placeholder="请输入数字（支持小数）"/>
        {/* <!-- 输入密码 --> */}
        <Field vModel={password.value} type="password" label="密码" placeholder="请输入密码"/>
      </div>
    )
  }
})