import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      { value: '焼肉', id: 1 },
      { value: '寿司', id: 2 },
    ],
    editingTodo: null,
    isEditing: false,
    inputValue: '',
  }),
  getters: {
    todoCount: (state) => {
      return state.todos.length
    },
    activeEditingTodo: (state) => {
      return state.editingTodo
    },
  },
  actions: {
    deleteTodos(id) {
      const newTodos = this.todos.filter((todo) => todo.id !== id)
      this.todos.length = 0
      this.todos.push(...newTodos)
    },
    addTodos(newTodos) {
      if (!newTodos || !newTodos.trim()) return
      this.todos.push({
        value: newTodos,
        id: Date.now(),
      })
    },
    editTodos({ id, newValue }) {
      const updatedTodos = this.todos.map((todo) =>
        todo.id === id ? { ...todo, value: newValue } : todo
      )
      if (!newValue || !newValue.trim()) return
      this.todos.length = 0
      this.todos.push(...updatedTodos)
      this.isEditing = false
      this.editingTodo = null
    },
    editTarget(id) {
      this.editingTodo = this.todos.find((todo) => todo.id === id)
      this.isEditing = true
      this.inputValue = this.editingTodo.value
    },
  },
})
