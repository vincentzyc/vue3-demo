import { defineComponent, ref, reactive, computed } from "vue";
import { Form, Field, NavBar, Button, Toast } from "vant";
import { useRouter } from "vue-router";
import CityPicker from "@/components/city-picker"

export default defineComponent({
  setup() {
    const router = useRouter()

    const cityPicker = ref()
    const vanForm = ref()

    const form = reactive({
      text: '',
      tel: '',
      address: '',
      city: []
    })

    const patterns = {
      phone: /^1[0-9]{10}$/,
      name: /^[\u4e00-\u9fa5]{2,20}$/,
      address: /^[\u4E00-\u9FA5A-Za-z0-9_—()（）-]+$/
    }

    const messages = {
      phone: (val: string) => {
        if (val === '') return '请输入手机号'
        return '手机号不正确'
      },
      name: (val: string) => {
        if (val === '') return '请输入姓名'
        return '姓名输入有误'
      },
      address: (val: string) => {
        console.log(val);
        if (val === '') return '请输入详细地址'
        return '详细地址输入有误'
      }
    }

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
      vanForm.value.validate().then(() => {
        Toast("保存")
        console.log('submit', form);
      }).catch((err: []) => {
        console.log(err);
      })
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
          <Form validate-first ref={vanForm}>
            <Field v-model={form.text} label="姓名" placeholder="请输入姓名" rules={[{ pattern: patterns.name, message: messages.name }]} />
            <Field v-model={form.tel} type="tel" label="手机号" placeholder="请输入手机号" maxlength={11} rules={[{ pattern: patterns.phone, message: messages.phone }]} />
            <Field
              readonly
              label="选择城市"
              rightIcon="arrow"
              modelValue={cityValue.value}
              placeholder="请选择城市"
              onClick={openCity}
              rules={[{ required: true, message: '请选择城市' }]}
            />
            <Field v-model={form.address} label="详细地址" placeholder="请输入详细地址" rules={[{ pattern: patterns.address, message: messages.address }]} />
            <Button type="primary" block onClick={onSubmit}>保存</Button>
          </Form>
        </div>

        <CityPicker v-model={form.city} ref={cityPicker} />

      </div>
    )
  }
})