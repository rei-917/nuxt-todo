<script setup>
import styles from '../assets/form.module.css'
import { useTodoStore } from '../stores/store'

const store = useTodoStore()

const submitTodo = () => {
  const trimmed = store.inputValue.trim()
  if (!trimmed) return
  if (store.isEditing) {
    store.editTodos({
      id: store.editingTodo.id,
      newValue: trimmed,
    })
  } else {
    store.addTodos(trimmed)
  }
  store.inputValue = ''
}
</script>
<template>
  <div :class="styles.formContainer">
    <input
      v-model="store.inputValue"
      type="text"
      :class="styles.input"
      placeholder="新しいTodoを入力"
    >
    <button :class="styles.button" @click="submitTodo">
      {{ store.isEditing ? '更新' : '追加' }}
    </button>
  </div>
</template>
