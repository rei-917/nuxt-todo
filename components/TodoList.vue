<script setup>
import styles from '../assets/list.module.css'
import { useTodoStore } from '../stores/store'

const store = useTodoStore()
const editTodo = (id) => {
  store.editTarget(id)
}
</script>
<template>
  <div>
    <ul>
      <li v-for="todo in store.todos"  :key="todo.id" :class="styles.list">
        <input :id="`todo_checkbox_${todo.id}`" type="checkbox" >
        <label :for="`todo_checkbox_${todo.id}`" :class="styles.checked">{{
          todo.value
        }}</label>
        <button
          :class="[styles.buttonBase, styles.deleteButton]"
          @click="store.deleteTodos(todo.id)"
        >
          削除
        </button>
        <button
          :class="[styles.buttonBase, styles.editButton]"
          @click="editTodo(todo.id)"
        >
          編集
        </button>
      </li>
    </ul>
  </div>
</template>
