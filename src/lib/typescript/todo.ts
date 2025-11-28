export type TodoFilterType = "All" | "Completed";

export type TodoModeType = "View" | "Edit";

export type TodoType = {
    _id?: string,
    content: string,
    completed: boolean
};

export type InitialTodoStateType = {
    todos: TodoType[],
    filter: TodoFilterType,
    addTodo: (todo: TodoType) => Promise<void>,
    saveTodo: (_id: string, content: string) => Promise<void>
    deleteTodo: (_id: string) => Promise<void>,
    setCompleted: (_id: string, value: boolean) => Promise<void>
};