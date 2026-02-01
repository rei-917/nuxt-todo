<script setup>
import TodoForm from '~/components/TodoForm.vue'
import TodoList from '~/components/TodoList.vue'
import { useTodoStore } from '~/stores/store.js'
defineOptions({ name: 'IndexPage' })

const todoStore = useTodoStore()
</script>

<template>
  <div>
    <TodoForm
      @todoEmit="todoStore.addTodos"
      @editEmit="todoStore.editTodos"
      :editProps="todoStore.editingTodo"
      :isEditing="todoStore.isEditing"
    />
    <TodoList
      :todoProps="todoStore.todos"
      :editProps="todoStore.editTodos"
      :deleteProps="todoStore.deleteTodos"
      @editEmit="todoStore.editTarget"
    />
  </div>
</template>
