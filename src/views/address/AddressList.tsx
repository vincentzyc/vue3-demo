import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { AddressList, NavBar } from "vant";
import { getLocalStorage, setLocalStorage } from '@/utils/storage';

export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const chosenAddressId = ref()
    const localAddress = getLocalStorage('addressList')

    const list = reactive(localAddress || [
      {
        id: 1,
        name: '张三',
        tel: '13012345678',
        address: '浙江省杭州市西湖区文三路138号东方通信大厦7楼501室',
        ads: "文三路 138 号东方通信大厦7楼501室",
        city: ["浙江省", "杭州市", "西湖区"],
        isDefault: true,
      },
      {
        id: 2,
        name: '李四',
        tel: '13112345678',
        address: '浙江省杭州市拱墅区莫干山路50号',
        ads: "莫干山路 50 号",
        city: ["浙江省", "杭州市", "拱墅区"],
      },
      {
        id: 3,
        name: '王五',
        tel: '13212345678',
        address: '浙江省杭州市滨江区江南大道15号',
        ads: "江南大道 15 号",
        city: ["浙江省", "杭州市", "滨江区"],
      },
    ])

    if (!localAddress) setLocalStorage('addressList', list)

    const onAdd = () => {
      router.push('/address/edit')
    }
    const onEdit = (item: any) => {
      store.commit('setSelectAddress', item)
      router.push('/address/edit')
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
            defaultTagText="默认"
            onAdd={onAdd}
            onEdit={onEdit}
          />
        </div >
      );
    };
  }
};