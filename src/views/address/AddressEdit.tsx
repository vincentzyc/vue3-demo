import { ref, defineComponent } from "vue";
import { Field, Cell } from "vant";
import CityPicker from "@/components/city-picker"

export default defineComponent({
  setup() {
    const text = ref('')
    const tel = ref('')
    const digit = ref('')
    const number = ref('')
    const password = ref('')
    const city = ref(['', '', ''])
    const cityPicker = ref()

    const openCity = () => {
      console.log(cityPicker.value);
      cityPicker.value.open()
    }
    return () => (
      <div class="mg10">
        {/* <!-- 输入任意文本 --> */}
        <Field v-model={text.value} label="文本" placeholder="请输入文本" />
        {/* <!-- 输入手机号，调起手机号键盘 --> */}
        <Field v-model={tel.value} type="tel" label="手机号" placeholder="请输入手机号" />
        {/* <!-- 允许输入正整数，调起纯数字键盘 --> */}
        <Field v-model={digit.value} type="digit" label="整数" placeholder="请输入整数" />
        {/* <!-- 允许输入数字，调起带符号的纯数字键盘 --> */}
        <Field v-model={number.value} type="number" label="数字" placeholder="请输入数字（支持小数）" />
        {/* <!-- 输入密码 --> */}
        <Field v-model={password.value} type="password" label="密码" placeholder="请输入密码" />

        <Cell is-link onClick={openCity}>选择城市</Cell>
        <CityPicker v-model={city.value} ref={cityPicker} />
      </div>
    )
  }
})