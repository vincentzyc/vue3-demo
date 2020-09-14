<template>
  <div class="todo-list text-center mg20">
    <h3 class="mg10">Todo List</h3>
    <div class="flex flex-center">
      <input ref="todoinput" v-model="addTodoName" v-focus="200" />
      <van-button type="primary" size="small" class="mg-l10" @click="addTodoAction">新增清单</van-button>
    </div>
    <div>
      <h3 class="mg10">任务清单</h3>
      <ul>
        <li v-for="item in undoneTodoList" :key="item.id" class="mg10">
          <span>---{{ item.name }}---</span>
          <van-button type="success" size="small" class="mg-l10" @click="doneTodo(item)">已完成</van-button>
          <van-button type="danger" size="small" class="mg-l10" @click="delTodoAction(item, true)">删除</van-button>
        </li>
      </ul>
    </div>
    <div class="done-todo-area">
      <h3 class="mg10">已完成的任务清单</h3>
      <ul>
        <li v-for="item in completedTodoList" :key="item.id" class="mg10">
          <span>---{{ item.name }}---</span>
          <van-button type="danger" size="small" class="mg-l10" @click="delTodoAction(item, false)">删除</van-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name: "ToDoList",
  setup() {
    const CurrentInstance = getCurrentInstance();

    const addTodoName = ref(""); // input 绑定值

    // 清单列表
    const undoneTodoList = reactive([
      {
        id: Date.now(),
        name: "吃饭",
      },
    ]);

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
      undoneTodoList.splice(
        undoneTodoList.findIndex((i) => i.id === item.id),
        1
      );
      completedTodoList.push(item);
    };

    return {
      addTodoName,
      addTodoAction,
      delTodoAction,
      doneTodo,
      undoneTodoList,
      completedTodoList,
    };
  },
});
</script>