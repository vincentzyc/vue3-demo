import { defineComponent, ref, reactive, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { Form, Field, NavBar, Button, Dialog, Cell, Switch, showToast } from 'vant';
import { openLoading, closeLoading } from '@/components/Loading';
import { getLocalStorage, setLocalStorage } from '@/utils/storage';
import { AddressInfo } from './address';
import CityPicker from '@/components/city-picker';
import { useMainStore } from '@/pinia';
import 'vant/es/form/style';
import 'vant/es/field/style';
import 'vant/es/nav-bar/style';
import 'vant/es/button/style';
import 'vant/es/cell/style';
import 'vant/es/switch/style';

export default defineComponent({
  setup() {
    const router = useRouter();
    const mainStore = useMainStore();

    const cityPicker = ref();
    const vanForm = ref();

    let form = reactive({
      id: Date.now(),
      name: '',
      tel: '',
      address: '',
      ads: '',
      city: [],
      isDefault: false,
    });

    const patterns = {
      phone: /^1[0-9]{10}$/,
      name: /^[\u4e00-\u9fa5]{2,20}$/,
      ads: /^[\u4E00-\u9FA5A-Za-z0-9_—()（）-]+$/,
    };

    const messages = {
      phone: (val: string) => {
        if (val === '') return '请输入手机号';
        return '手机号不正确';
      },
      name: (val: string) => {
        if (val === '') return '请输入姓名';
        return '姓名输入有误';
      },
      ads: (val: string) => {
        if (val === '') return '请输入详细地址';
        return '详细地址输入有误';
      },
    };

    const cityValue = computed(() => {
      if (form.city.length > 0) return form.city.join(' ');
      return '';
    });

    const openCity = () => {
      cityPicker.value.open();
    };

    const routerBack = () => {
      router.back();
    };

    const onSubmit = () => {
      vanForm.value
        .validate()
        .then(() => {
          openLoading('正在保存');
          console.log('submit', form);
          let addressList = getLocalStorage('addressList');
          if (addressList && Array.isArray(addressList)) {
            form.address = form.city.join('') + form.ads;
            const index = addressList.findIndex(v => {
              return v.id === form.id;
            });
            if (form.isDefault) {
              addressList.forEach(v => (v.isDefault = false));
            }
            if (index >= 0) {
              addressList.splice(index, 1, form);
            } else {
              addressList.push(form);
            }
          } else {
            addressList = [form];
          }
          setLocalStorage('addressList', addressList);
          setTimeout(() => {
            closeLoading();
            showToast('保存成功');
            routerBack();
          }, 1000);
        })
        .catch((err: []) => {
          console.log(err);
        });
    };

    const handleDelete = () => {
      Dialog.confirm({
        title: '提示',
        message: '确定删除此地址？',
      })
        .then(() => {
          // on confirm
          let localAddress = getLocalStorage('addressList');
          localAddress = localAddress?.filter((v: AddressInfo) => v.id !== form.id);
          if (form.isDefault) {
            if (Array.isArray(localAddress) && localAddress.length > 0) localAddress[0].isDefault = true;
          }
          setLocalStorage('addressList', localAddress);
          showToast('删除成功');
          router.back();
        })
        .catch(() => {
          // on cancel
        });
    };

    const SwitchSlots = {
      'right-icon': () => <Switch v-model={form.isDefault} size="24" />,
    };

    const initAddress = () => {
      if (mainStore.selectAddress) form = mainStore.selectAddress;
    };
    initAddress();

    onUnmounted(() => {
      mainStore.selectAddress = null;
    });

    return () => (
      <div class="pd-nav">
        <NavBar fixed title="地址管理" left-text="返回" left-arrow onClickLeft={routerBack} />
        <div class="mg10">
          <Form validate-first ref={vanForm}>
            <Field
              v-model={form.name}
              label="姓名"
              placeholder="请输入姓名"
              rules={[{ pattern: patterns.name, message: messages.name }]}
            />
            <Field
              v-model={form.tel}
              type="tel"
              label="手机号"
              placeholder="请输入手机号"
              maxlength={11}
              rules={[{ pattern: patterns.phone, message: messages.phone }]}
            />
            <Field
              readonly
              label="选择城市"
              rightIcon="arrow"
              modelValue={cityValue.value}
              placeholder="请选择城市"
              onClick={openCity}
              rules={[{ required: true, message: '请选择城市' }]}
            />
            <Field
              v-model={form.ads}
              label="详细地址"
              placeholder="请输入详细地址"
              rules={[{ pattern: patterns.ads, message: messages.ads }]}
            />
            <Cell title="默认地址" v-slots={SwitchSlots}>
              {' '}
            </Cell>
            <div class="mg10 mg-t20">
              <Button type="danger" round block onClick={onSubmit}>
                保存
              </Button>
              <Button round block onClick={handleDelete} style="margin-top:20px" v-show={mainStore.selectAddress}>
                删除
              </Button>
            </div>
          </Form>
        </div>

        <CityPicker v-model={form.city} ref={cityPicker} />
      </div>
    );
  },
});
