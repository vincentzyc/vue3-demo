<template>
  <div class="todo-list text-center mg20">
    <h3 class="mg10">Todo List</h3>
    <div class="flex flex-center">
      <input ref="todoinput" v-model="addTodoName" v-focus="200" />
      <Button type="primary" size="small" @click="addTodoAction">新增清单</Button>
    </div>
    <div>
      <h3 class="mg10">任务清单</h3>
      <CellGroup>
        <Cell v-for="item in undoneTodoList" :key="item.id">
          <template #title>
            <span>---{{ item.name }}---</span>
          </template>
          <template #right-icon>
            <Button type="success" size="small" @click="doneTodo(item)">已完成</Button>
            <Button type="danger" size="small" @click="delTodoAction(item, true)">删除</Button>
          </template>
        </Cell>
      </CellGroup>
    </div>
    <div class="done-todo-area">
      <h3 class="mg10">已完成的任务清单</h3>
      <CellGroup>
        <Cell v-for="item in completedTodoList" :key="item.id">
          <template #title>
            <span>---{{ item.name }}---</span>
          </template>
          <template #right-icon>
            <Button type="danger" size="small" @click="delTodoAction(item, false)">删除</Button>
          </template>
        </Cell>
      </CellGroup>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, getCurrentInstance } from "vue";
import { Button, Cell, CellGroup } from "vant";

export default defineComponent({
  name: "ToDoList",
  components: {
    Button,
    Cell,
    CellGroup,
  },
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