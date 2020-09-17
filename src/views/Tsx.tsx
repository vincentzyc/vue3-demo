import { ref, reactive } from "vue";
import { AddressList, NavBar, Toast } from "vant";

export default {
  setup() {
    const chosenAddressId = ref('1')

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
      Toast('新增地址');
    }
    const onEdit = (item: any, index: string) => {
      Toast('编辑地址:' + index);
    }

    const onClickLeft = () => {
      Toast('返回');
    }

    const onClickRight = () => {
      Toast('按钮');
    }

    return () => {
      return (
        <div style="background:#f7f8fa">
          <NavBar
            title="标题"
            left-text="返回"
            right-text="按钮"
            left-arrow
            onClick-left={onClickLeft}
            onClick-right={onClickRight}
          />
          <AddressList
            vModel={chosenAddressId.value}
            list={list}
            disabledList={disabledList}
            disabledText="以下地址超出配送范围"
            defaultTagText="默认"
            onAdd={onAdd}
            onEdit={onEdit}
          />
        </div>
      );
    };
  }
};