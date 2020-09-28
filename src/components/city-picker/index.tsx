import { defineComponent, ref, reactive } from 'vue';
import { Popup, Picker } from 'vant';
import CITYS from './city.json';

export default defineComponent({
  props: {
    value: {
      type: Array,
      default: () => [],
    }
  },
  setup(props, ctx) {
    const showPicker = ref(false)
    const valuesArr = ref(['', '', ''])
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

    // function onChange() { }
    function close(boolean: boolean) {
      showPicker.value = false;
      ctx.emit('close', valuesArr, boolean)
    }

    function open() {
      showPicker.value = true
    }

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

    function initLocalCitys() {
      const province = CITYS.map(v => v.n);
      const city = getChildAddress(province[0])
      const area = getChildAddress(province[0], city[0])
      columns[0].values = province;
      columns[1].values = city;
      columns[2].values = area;
      valuesArr.value = [province[0], city[0], area[0]];
      ctx.emit('input', valuesArr.value)
    }

    initLocalCitys()

    return {
      showPicker,
      columns,
      close,
      open
    }
  },
  render() {
    return (
      <Popup v-model={[this.showPicker, 'show']} position="bottom">
        <Picker
          show-toolbar
          title="请选择省市区"
          ref="adsPicker"
          columns={this.columns}
          // onChange={onChange}
          onCancel={this.close(false)}
          onConfirm={this.close(true)}
        />
      </Popup>
    )
  }
})

