import { defineStore } from "pinia";
type todo = {
  value: string;
  id: number;
};
type idNumber = number;
type editTodos = {
  id: number;
  newValue: string;
};
type editing = null | todo;

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [
      { value: "焼肉", id: 1 },
      { value: "寿司", id: 2 },
    ] as todo[],
    editingTodo: null as editing,
    isEditing: false,
    inputValue: "",
  }),
  getters: {
    todoCount: (state) => {
      return state.todos.length;
    },
    activeEditingTodo: (state) => {
      return state.editingTodo;
    },
  },
  actions: {
    deleteTodos(id: idNumber) {
      const newTodos = this.todos.filter((todo) => todo.id !== id);
      this.todos.length = 0;
      this.todos.push(...newTodos);
    },
    addTodos(newTodos: string) {
      if (!newTodos || !newTodos.trim()) return;
      this.todos.push({
        value: newTodos,
        id: Date.now(),
      });
    },
    editTodos({ id, newValue }: editTodos) {
      const updatedTodos = this.todos.map((todo) =>
        todo.id === id ? { ...todo, value: newValue } : todo,
      );
      if (!newValue || !newValue.trim()) return;
      this.todos.length = 0;
      this.todos.push(...updatedTodos);
      this.isEditing = false;
      this.editingTodo = null;
    },
    editTarget(id: idNumber) {
      const foundTodo = this.todos.find((todo) => todo.id === id);
      if (!foundTodo) {
        this.editingTodo = null;
        return;
      }
      this.editingTodo = foundTodo;
      this.isEditing = true;
      this.inputValue = this.editingTodo.value;
    },
  },
});
