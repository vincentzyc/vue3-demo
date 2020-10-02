import { defineComponent, ref, computed } from "vue";
import { Field, NavBar } from "vant";
import { useRouter } from "vue-router";
import CityPicker from "@/components/city-picker"

export default defineComponent({
  setup() {
    const router = useRouter()

    const text = ref('')
    const tel = ref('')
    const address = ref('')
    const city = ref([])
    const cityPicker = ref()

    const cityValue = computed(() => {
      if (city.value.length > 0) return city.value.join(' ')
      return ''
    })

    const openCity = () => {
      cityPicker.value.open()
    }

    const onClickLeft = () => {
      router.back()
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
          <Field v-model={text.value} label="姓名" placeholder="请输入姓名" />
          <Field v-model={tel.value} type="tel" label="手机号" placeholder="请输入手机号" />
          <Field
            readonly
            label="选择城市"
            rightIcon="arrow"
            modelValue={cityValue.value}
            placeholder="请选择城市"
            onClick={openCity}
          />
          <Field v-model={address.value} label="详细地址" placeholder="请输入详细地址" />
        </div>

        <CityPicker v-model={city.value} ref={cityPicker} />

      </div>
    )
  }
})