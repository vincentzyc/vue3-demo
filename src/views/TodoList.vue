<template>
  <div class="todo-list text-center mg20">
    <h3 class="mg10">Todo List</h3>
    <div class="flex flex-center">
      <input ref="todoinput" v-focus="200" v-model="addTodoName" />
      <Button @click="addTodoAction" size="small" type="primary">新增清单</Button>
    </div>
    <div>
      <h3 class="mg10">任务清单</h3>
      <CellGroup>
        <Cell :key="item.id" v-for="item in undoneTodoList">
          <template #title>
            <span>---{{ item.name }}---</span>
          </template>
          <template #right-icon>
            <Button @click="doneTodo(item)" size="small" type="success">已完成</Button>
            <Button @click="delTodoAction(item, true)" size="small" type="danger">删除</Button>
          </template>
        </Cell>
      </CellGroup>
    </div>
    <div class="done-todo-area">
      <h3 class="mg10">已完成的任务清单</h3>
      <CellGroup>
        <Cell :key="item.id" v-for="item in completedTodoList">
          <template #title>
            <span>---{{ item.name }}---</span>
          </template>
          <template #right-icon>
            <Button @click="delTodoAction(item, false)" size="small" type="danger">删除</Button>
          </template>
        </Cell>
      </CellGroup>
    </div>
    <div class="mg10">
      <Button @click="goAddress" block type="primary">地址列表</Button>
    </div>
    <div class="mg10 mg-t20">
      <Button @click="goChat" block type="primary">聊天室</Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { Button, Cell, CellGroup } from "vant";
import { useRouter } from 'vue-router'
import { useMainStore } from '@/pinia'

const mainStore = useMainStore()

const router = useRouter()
const CurrentInstance = getCurrentInstance();
const todoinput = ref()
const addTodoName = ref(""); // input 绑定值

// 获取 pinia 任务清单列表
const undoneTodoList = mainStore.undoneTodoList
// 调用 pinia 的 actions 方法
// mainStore.reset()

// 已完成的清单列表
const completedTodoList = reactive([
  {
    id: Date.now(),
    name: "睡觉",
  },
]);

const addTodoAction = () => {
  if (addTodoName.value === "")
    return (CurrentInstance?.refs?.todoinput as HTMLInputElement).focus();
  // if (addTodoName.value === "") return todoinput.focus();
  const obj = {
    id: Date.now(),
    name: addTodoName.value,
  };
  undoneTodoList.push(obj);
  addTodoName.value = "";
};

const delTodoAction = (item: { id: number }, todo: boolean) => {
  if (todo) {
    undoneTodoList.splice(
      undoneTodoList.findIndex((i) => i.id === item.id),
      1
    );
  } else {
    completedTodoList.splice(
      completedTodoList.findIndex((i) => i.id === item.id),
      1
    );
  }
};

const doneTodo = (item: { id: number; name: string }) => {
  undoneTodoList.splice(undoneTodoList.findIndex((i) => i.id === item.id), 1);
  completedTodoList.push(item);
};

function goAddress() {
  router.push("/address/list");
}

function goChat() {
  router.push("/chat/list");
}

</script>