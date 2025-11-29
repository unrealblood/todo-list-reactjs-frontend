import { useState, type Dispatch, type SetStateAction } from "react";
import type { TodoModeType, TodoType } from "../../../../lib/typescript/todo";
import { useTodoStore } from "../../../../zustand/store";
import { useMarkTodoCompleted } from "../../../../lib/tanstack-query/todo";

interface TodoItemViewProps {
    length: number,
    index: number,
    setMode: Dispatch<SetStateAction<TodoModeType>>
    todo: TodoType
}

function TodoItemView({length, index, setMode, todo}: TodoItemViewProps) {
    const markTodoCompleted = useMarkTodoCompleted();

    const [isCompleted, setIsCompleted] = useState<boolean>(todo.completed);

    function handleMarkTodoCompleted() {
        markTodoCompleted.mutate({
            _id: todo._id!,
            value: !isCompleted
        });
        
        useTodoStore.getState().setCompleted(todo._id!, !isCompleted);
        
        setIsCompleted(!isCompleted);
    }

    function deleteTodo() {
        useTodoStore((state) => (state.deleteTodo(todo._id!)));
    }

    return (
        <div className={`${(length === (index + 1)) ? `` : `border-b border-gray-200`} p-2 flex justify-between items-center`}>
            <div className={`${todo.completed && `line-through`}`}>{todo.content}</div>

            <div className="flex justify-end items-center gap-2 pl-4">
                <button type="button" className="bi-pencil-square bg-blue-500 text-white text-xl cursor-pointer py-2 px-4 rounded-full" onClick={() => setMode("Edit")}></button>

                <button type="button" className="bi-check-square bg-blue-500 text-white text-xl cursor-pointer py-2 px-4 rounded-full" onClick={handleMarkTodoCompleted}></button>

                <button type="button" className="bi-x-square bg-red-500 text-white text-xl cursor-pointer py-2 px-4 rounded-full" onClick={deleteTodo}></button>
            </div>
        </div>
    );
}

export {TodoItemView};