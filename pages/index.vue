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
      :edit-props="todoStore.editingTodo"
      :is-editing="todoStore.isEditing"
      @todo-emit="todoStore.addTodos"
      @edit-emit="todoStore.editTodos"
    />
    <TodoList
      :todo-props="todoStore.todos"
      :edit-props="todoStore.editTodos"
      :delete-props="todoStore.deleteTodos"
      @edit-emit="todoStore.editTarget"
    />
  </div>
</template>
