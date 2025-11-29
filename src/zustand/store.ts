import { create } from "zustand";
import type { InitialTodoStateType, TodoType } from "../lib/typescript/todo";

export const useTodoStore = create<InitialTodoStateType>((set) => ({
    todos: [],
    filter: "All",
    setTodos: async (todos: TodoType[]) => {
        set(({todos}));
    },
    addTodo: async (todo: TodoType) => {
        set((state) => ({todos: [...state.todos, todo]}));
    },
    saveTodo: async (_id: string, content: string) => {
        set((state) => ({todos: state.todos.map((todo) => (todo._id === _id) ? {...todo, content} : todo)}));
    },
    deleteTodo: async (_id: string) => {
        set((state) => ({todos: state.todos.filter((todo) => (todo._id !== _id))}));
    },
    setCompleted: async (_id, value) => {
        set((state) => ({todos: state.todos.map((todo) => (todo._id === _id) ? {...todo, completed: value} : todo)}));
    }
}));