import { defineComponent, ref, reactive, computed } from "vue";
import { Form, Field, NavBar, Button, Toast } from "vant";
import { useRouter } from "vue-router";
import CityPicker from "@/components/city-picker"

export default defineComponent({
  setup() {
    const router = useRouter()

    const cityPicker = ref()

    const form = reactive({
      text: '',
      tel: '',
      address: '',
      city: []
    })

    const cityValue = computed(() => {
      if (form.city.length > 0) return form.city.join(' ')
      return ''
    })

    const openCity = () => {
      cityPicker.value.open()
    }

    const onClickLeft = () => {
      router.back()
    }

    const onSubmit = () => {
      Toast("保存")
      console.log('submit', form);
    }


    return () => (
      <div>
        <NavBar
          title="地址管理"
          left-text="返回"
          left-arrow
          onClick-left={onClickLeft}
        />
        <div class="mg10">
          <Form validate-first>
            <Field v-model={form.text} label="姓名" placeholder="请输入姓名" rules={[{ required: true, message: '请输入姓名' }]} />
            <Field v-model={form.tel} type="tel" label="手机号" placeholder="请输入手机号" maxlength={11} />
            <Field
              readonly
              label="选择城市"
              rightIcon="arrow"
              modelValue={cityValue.value}
              placeholder="请选择城市"
              onClick={openCity}
            />
            <Field v-model={form.address} label="详细地址" placeholder="请输入详细地址" />
            <Button type="primary" block onClick={onSubmit}>保存</Button>
          </Form>
        </div>

        <CityPicker v-model={form.city} ref={cityPicker} />

      </div>
    )
  }
})