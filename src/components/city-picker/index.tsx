import { defineComponent, ref, reactive } from 'vue';
import { useExpose } from '@/composition/use-expose';
import { Popup, Picker } from 'vant';
import CITYS from './city.json';

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    }
  },
  setup(props, { emit }) {
    const showPicker = ref(false)
    const valuesArr = ref(['', '', ''])
    const adsPicker = ref()
    const columns = reactive([
      {
        values: ['']
      },
      {
        values: ['']
      },
      {
        values: ['']
      }
    ])

    function getChildAddress(province: string, city?: string): string[] {
      if (!province) return [];
      let provinceInfo = null, provinceList = [];
      for (const item of CITYS) {
        if (item.n === province) {
          provinceInfo = item;
          break
        }
      }
      provinceList = provinceInfo ? provinceInfo.c.map(v => v.n) : []
      if (!city) return provinceList
      let allCity = null, cityList = []
      if (!provinceInfo) return []
      for (const item of provinceInfo.c) {
        if (item.n === city) {
          allCity = item;
          break
        }
      }
      cityList = allCity ? allCity.c.map(v => v.n) : [];
      return cityList
    }

    function onChange(value: ['', '', '']) {
      if (!showPicker.value) return;
      if (!value[0]) return;
      if (valuesArr.value[0] !== value[0]) {
        //改变省份
        const cityList = getChildAddress(value[0]);
        const areaList = getChildAddress(value[0], cityList[0]);
        adsPicker.value.setColumnValues(1, cityList);
        adsPicker.value.setColumnValues(2, areaList);
      } else if (valuesArr.value[1] !== value[1]) {
        //改变市
        const areaList = getChildAddress(value[0], value[1]);
        adsPicker.value.setColumnValues(2, areaList);
        adsPicker.value.setColumnValue(2, areaList[0]);
      }
      valuesArr.value = adsPicker.value.getValues();
      emit('update:modelValue', valuesArr.value);
    }

    function confirm() {
      showPicker.value = false;
      emit('close', valuesArr.value)
      emit('update:modelValue', valuesArr.value);
    }
    function cancel() {
      showPicker.value = false;
      emit('close', valuesArr.value)
    }

    function open() {
      showPicker.value = true
    }

    function initLocalCitys() {
      const province = CITYS.map(v => v.n);
      const city = getChildAddress(province[0])
      const area = getChildAddress(province[0], city[0])
      columns[0].values = province;
      columns[1].values = city;
      columns[2].values = area;
      valuesArr.value = [province[0], city[0], area[0]];
    }

    initLocalCitys()

    useExpose({ open, close });

    return () => (
      <Popup v-model={[showPicker.value, 'show']} position="bottom">
        <Picker
          show-toolbar
          title="请选择省市区"
          ref={adsPicker}
          columns={columns}
          onChange={onChange}
          onCancel={cancel}
          onConfirm={confirm}
        />
      </Popup>
    )
  }
})

