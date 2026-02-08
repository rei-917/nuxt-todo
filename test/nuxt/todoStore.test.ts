import { setActivePinia, createPinia } from 'pinia'
import { describe, test, expect, beforeEach } from 'vitest'

import { useTodoStore } from '../../stores/store.js'

describe('useTodoStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTodoStore()
  })
  test('渡した値がstateに反映されるか', () => {
    store.inputValue = 'test'
    expect(store.inputValue).toBe('test')
  })
  test('addTodo()で新規todoが追加されるか', () => {
    store.addTodos('test')
    expect(store.todos[store.todos.length - 1].value).toBe('test')
    expect(store.todos.length).toBe(3)
  })
  test('addTodo()で空文字が追加出来ないか', () => {
    const beforeTodos = store.todos.length
    store.addTodos('')
    expect(beforeTodos).toEqual(store.todos.length)
  })
  test('editTodos()で正しく更新されるか', () => {
    const targetTodo = store.todos[0]
    store.editTodos({ id: targetTodo.id, newValue: 'newTodo' })
    expect(store.todos[0].value).toBe('newTodo')
  })
  test('deleteTodos()で削除されるか', () => {
    const beforeTodoCount = store.todos.length
    const targetTodo = store.todos[0]
    store.deleteTodos(targetTodo.id)
    expect(store.todos.length).toBe(beforeTodoCount - 1)
  })
  test('todoCountがtodos.lengthと一致するか', () => {
    expect(store.todoCount).toEqual(store.todos.length)
  })
  test('activeEditingTodoがeditingTodoを返すこと', () => {
    store.editingTodo = 'test'
    expect(store.activeEditingTodo).toBe('test')
  })
  test('stateの初期値が期待通りであること', () => {
    expect(store.editingTodo).toBe(null)
    expect(store.isEditing).toBe(false)
    expect(store.inputValue).toBe('')
  })
  test('isEditingの値が正しく切り替わること', () => {
    const beforeEdit = store.isEditing
    store.editTarget(1)
    const afterEdit = store.isEditing
    expect(beforeEdit).toBe(false)
    expect(afterEdit).toBe(true)
  })
  test('editingTodoの値が正しく切り替わること', () => {
    const beforeEdit = store.editingTodo
    const targetId = store.todos.find((todo) => todo.id === 1)
    store.editTodos({ id: targetId.id, newValue: 'editTodo' })
    const afterEditTodo = store.todos.find((todo) => todo.id === targetId.id)
    const afterEdit = store.editingTodo
    expect(beforeEdit).toBe(null)
    expect(afterEditTodo.value).toBe('editTodo')
    expect(afterEdit).toBe(null)
  })
})
