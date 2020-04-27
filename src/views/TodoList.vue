<template>
  <div class="todo-list">
    <h3>Todo List</h3>
    <div>
      <label>
        <input ref="todoinput" v-model="addTodoName" />
      </label>
      <label>
        <button @click="addTodoAction">新增清单</button>
      </label>
    </div>
    <div>
      <h3>任务清单</h3>
      <ul>
        <li v-for="item in undoneTodoList" :key="item.id">
          <span>---{{ item.name }}--- </span>
          <button @click="doneTodo(item)">已完成</button>
          <button @click="delTodoAction(item, true)">删除</button>
        </li>
      </ul>
    </div>
    <div class="done-todo-area">
      <h3>已完成的任务清单</h3>
      <ul>
        <li v-for="item in completedTodoList" :key="item.id">
          <span>---{{ item.name }}--- </span>
          <button @click="delTodoAction(item, false)">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, reactive, getCurrentInstance } from "vue";

export default {
  name: "ToDoList",
  setup() {
    const { ctx } = getCurrentInstance();
    const addTodoName = ref(""); // input 绑定值
    const undoneTodoList = reactive([{
      id: Date.now(),
      name: '吃饭'
    }]); // 清单列表
    const completedTodoList = reactive([{
      id: Date.now(),
      name: '睡觉'
    }]); // 已完成的清单列表

    const addTodoAction = () => {
      if (addTodoName.value === "") return ctx.$refs.todoinput.focus()
      const obj = {
        id: Date.now(),
        name: addTodoName
      };
      undoneTodoList.push(JSON.parse(JSON.stringify(obj)));
      addTodoName.value = "";
    };

    const delTodoAction = (item, todo) => {
      if (todo) {
        undoneTodoList.splice(undoneTodoList.findIndex(i => i.id === item.id), 1);
      } else {
        completedTodoList.splice(completedTodoList.findIndex(i => i.id === item.id), 1);
      }
    };

    const doneTodo = item => {
      undoneTodoList.splice(undoneTodoList.findIndex(i => i.id === item.id), 1);
      completedTodoList.push(item);
    };

    return {
      addTodoName,
      addTodoAction,
      delTodoAction,
      doneTodo,
      undoneTodoList,
      completedTodoList
    };
  }
};
</script>