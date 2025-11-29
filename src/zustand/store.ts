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
    saveTodo: async () => {
    },
    deleteTodo: async () =>{
    },
    setCompleted: async (_id, value) => {
        set((state) => ({todos: state.todos.map((todo) => (todo._id === _id) ? {...todo, completed: value} : todo)}));
    }
}));