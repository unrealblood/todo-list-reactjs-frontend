export type TodoFilterType = "All" | "Completed";

export type TodoModeType = "View" | "Edit";

export type TodoType = {
    _id?: string,
    content: string,
    completed: boolean,
    userId?: string
};

export type InitialTodoStateType = {
    todos: TodoType[],
    filter: TodoFilterType,
    setTodos: (todos: TodoType[]) => Promise<void>, 
    addTodo: (todo: TodoType) => Promise<void>,
    saveTodo: () => Promise<void>
    deleteTodo: () => Promise<void>,
    setCompleted: (_id: string, value: boolean) => Promise<void>
};