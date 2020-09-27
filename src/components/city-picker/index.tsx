import { defineComponent, ref, reactive } from 'vue';
import { Popup, Picker } from 'vant';
// import CITYS from './city.json';

export default defineComponent({
  setup(props, ctx) {
    const showPicker = ref(false)
    const valuesArr = ref([])
    const columns = reactive([
      {
        values: []
      },
      {
        values: []
      },
      {
        values: []
      }
    ])

    const onChange = () => { }
    const close = (boolean: boolean) => {
      showPicker.value = false;
      ctx.emit('close', valuesArr, boolean)
    }

    const open = () => {
      showPicker.value = true
    }

    return () => (
      <Popup vModel={showPicker.value} position="bottom">
        <Picker
          show-toolbar
          title="请选择省市区"
          ref="adsPicker"
          columns={columns}
          onChange={onChange}
          onCancel={close(false)}
          onConfirm={close(true)}
        />
      </Popup>
    )
  }
})

