import { defineComponent, ref } from 'vue';
import { Popup, Area } from 'vant';
import 'vant/es/popup/style';
import 'vant/es/picker/style';
import 'vant/es/area/style';
import { areaList } from '@vant/area-data';

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  setup(_props, { emit, expose }) {
    const showPicker = ref(false);
    const valuesArr = ref(['', '', '']);

    function confirm({ selectedOptions }: { selectedOptions: any[] }) {
      showPicker.value = false;
      valuesArr.value = selectedOptions.map(v => v.text);
      emit('close', valuesArr.value);
      emit('update:modelValue', valuesArr.value);
    }
    function cancel() {
      showPicker.value = false;
      emit('close', valuesArr.value);
    }

    function open() {
      showPicker.value = true;
    }

    expose({ open, close });

    return () => (
      <Popup v-model={[showPicker.value, 'show']} position="bottom">
        <Area title="标题" area-list={areaList} onConfirm={confirm} onCancel={cancel} />
      </Popup>
    );
  },
});
