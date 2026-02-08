import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { describe, test, expect, vi, beforeEach } from 'vitest'

import TodoForm from '../../components/TodoForm.vue'
import { useTodoStore } from '../../stores/store.js'

describe('TodoForm', () => {
  let store
  let wrapper

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTodoStore()
    wrapper = mount(TodoForm)
  })

  test('追加ボタンクリックしたときにクリックを検知できていること', async () => {
    const spy = vi.spyOn(store, 'addTodos')
    store.isEditing = false
    store.inputValue = 'test'
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(spy).toHaveBeenCalled()
  })
  test('更新ボタンクリックしたときにクリックを検知できていること', async () => {
    const spy = vi.spyOn(store, 'editTodos')
    store.isEditing = true
    store.editingTodo = { id: 1, value: '焼肉' }
    store.inputValue = 'test'
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(spy).toHaveBeenCalled()
  })
  test('編集状態になった時にボタンの文言が追加から更新に変わること', async () => {
    store.isEditing = true
    await wrapper.vm.$nextTick()
    const button = wrapper.find('button')
    const buttonText = button.text()
    expect(buttonText).toBe('更新')
  })
  test('編集中のTodoがある時、フォームに反映されること', async () => {
    store.editTarget(1)
    await wrapper.vm.$nextTick()
    const input = wrapper.find('input')
    expect(input.element.value).toBe('焼肉')
  })
  test('submitした時にフォームがリセットされること', async () => {
    store.inputValue = 'test reset'
    await wrapper.vm.$nextTick()
    const submitButton = wrapper.find('button')
    const input = wrapper.find('input')
    await submitButton.trigger('click')
    expect(input.element.value).toBe('')
  })
  test('空文字が入力された時にtodosが変化しないこと', async () => {
    const beforeSubmit = store.todos.length
    store.inputValue = ''
    const submitButton = wrapper.find('button')
    await wrapper.vm.$nextTick()
    await submitButton.trigger('click')
    const afterSubmit = store.todos.length
    expect(beforeSubmit === afterSubmit).toBeTruthy()
  })
  test('スペースが入力された時にaddTodos/editTodosが実行されないこと', async () => {
    const addSpy = vi.spyOn(store, 'addTodos')
    const editSpy = vi.spyOn(store, 'editTodos')
    store.inputValue = ' '
    const submitButton = wrapper.find('button')
    await wrapper.vm.$nextTick()
    await submitButton.trigger('click')
    expect(addSpy).not.toHaveBeenCalled()
    expect(editSpy).not.toHaveBeenCalled()
  })
})
