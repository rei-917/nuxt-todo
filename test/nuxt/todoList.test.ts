import { mount } from "@vue/test-utils";
import type { VueWrapper } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { describe, test, expect, vi, beforeEach } from "vitest";

import TodoList from "../../components/TodoList.vue";
import { useTodoStore } from "../../stores/store.js";

describe("TodoList", () => {
  let store: ReturnType<typeof useTodoStore>;
  let wrapper: VueWrapper;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useTodoStore();
    wrapper = mount(TodoList);
  });
  test("要素を追加した時にリストに描画されること", async () => {
    store.todos = [{ id: 1, value: "テストTODO" }];
    await wrapper.vm.$nextTick();
    const todoList = wrapper.findAll("label");
    const testTodo = todoList.find((target) => target.text() === "テストTODO");
    expect(testTodo).toBeTruthy();
  });
  test("削除ボタンをクリックした時にクリックを検知できていること", async () => {
    const spy = vi.spyOn(store, "deleteTodos");
    const button = wrapper.findAll("button");
    const deleteButton = button.find((target) => target.text() === "削除")!;
    deleteButton.trigger("click");
    expect(spy).toHaveBeenCalledWith(1);
  });
  test("編集ボタンをクリックした時に検知できていること", async () => {
    const spy = vi.spyOn(store, "editTarget");
    const button = wrapper.findAll("button");
    const editButton = button.find((target) => target.text() === "編集")!;
    editButton.trigger("click");
    expect(spy).toHaveBeenCalledWith(1);
  });
});
