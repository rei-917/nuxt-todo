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
      type="text"
      v-model="store.inputValue"
      :class="styles.input"
      placeholder="新しいTodoを入力"
    />
    <button @click="submitTodo" :class="styles.button">
      {{ store.isEditing ? '更新' : '追加' }}
    </button>
  </div>
</template>
