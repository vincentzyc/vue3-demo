import { ref, defineComponent } from "vue";
import { Field, Cell } from "vant";
import CityPicker from "@/components/city-picker"

export default defineComponent({
  setup() {
    const text = ref('')
    const tel = ref('')
    const address = ref('')
    const city = ref(['', '', ''])
    const cityPicker = ref()

    const openCity = () => {
      console.log(cityPicker.value);
      cityPicker.value.open()
    }
    return () => (
      <div class="mg10">
        <Field v-model={text.value} label="姓名" placeholder="请输入姓名" />
        <Field v-model={tel.value} type="tel" label="手机号" placeholder="请输入手机号" />
        <Cell is-link onClick={openCity}>选择城市</Cell>
        <CityPicker v-model={city.value} ref={cityPicker} />
        <Field v-model={address.value} label="详细地址" placeholder="请输入详细地址" />
      </div>
    )
  }
})