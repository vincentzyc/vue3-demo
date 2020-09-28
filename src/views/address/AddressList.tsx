import { ref, reactive } from "vue";
import { AddressList, NavBar, Toast, Popup } from "vant";
import AddressEdit from './AddressEdit'
import router from '@/router'

export default {
  setup() {
    const chosenAddressId = ref('1')
    const showEdit = ref(false)

    const list = reactive([
      {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
    ])
    const disabledList = reactive([
      {
        id: '3',
        name: '王五',
        tel: '1320000000',
        address: '浙江省杭州市滨江区江南大道 15 号',
      },
    ])

    const onAdd = () => {
      showEdit.value = true
    }
    const onEdit = (item: any, index: string) => {
      Toast('编辑地址:' + index);
    }

    const onClickLeft = () => {
      router.back()
    }

    const onClickRight = () => {
      router.push('/todoList')
    }

    return () => {
      return (
        <div style="background:#f7f8fa">
          <NavBar
            title="地址管理"
            left-text="返回"
            right-text="Todo"
            left-arrow
            onClick-left={onClickLeft}
            onClick-right={onClickRight}
          />
          <AddressList
            v-model={chosenAddressId.value}
            list={list}
            disabledList={disabledList}
            disabledText="以下地址超出配送范围"
            defaultTagText="默认"
            onAdd={onAdd}
            onEdit={onEdit}
          />
          <Popup v-model={[showEdit.value, 'show']} position="bottom" round style="height: 80%" >
            <AddressEdit />
          </Popup>
        </div >
      );
    };
  }
};