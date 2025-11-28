import type { Dispatch, SetStateAction } from "react";
import type { TodoModeType, TodoType } from "../../../../lib/typescript/todo";
import { useTodoStore } from "../../../../zustand/store";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { UpdateTodoFieldsType } from "../../../../lib/react-hook-form/add-todo-form";

interface TodoItemEditProps {
    length: number,
    index: number,
    todo: TodoType,
    setMode: Dispatch<SetStateAction<TodoModeType>>
}

function TodoItemEdit({todo, length, index, setMode}: TodoItemEditProps) {
    const { register, handleSubmit } = useForm<UpdateTodoFieldsType>({
        defaultValues: {
            content: todo.content
        }
    });

    function handleUpdateTodo(data: UpdateTodoFieldsType): SubmitHandler<UpdateTodoFieldsType> {
        useTodoStore.getState().saveTodo(todo._id!, data.content);
        setMode("View");
    }

    return (
        <form onSubmit={handleSubmit(handleUpdateTodo)} className={`${(length === (index + 1)) ? `` : `border-b border-gray-200`} p-2 flex justify-between items-center`}>
            <textarea rows={3} className="resize-none w-[400px] bg-gray-200 p-2 rounded-xl" {...register("content", {
                required: true
            })} />

            <div className="flex justify-end items-center gap-2 pl-4">
                <button type="submit" className="bi-check-square bg-blue-500 text-white text-xl cursor-pointer py-2 px-4 rounded-full"></button>
            </div>
        </form>
    );
}

export {TodoItemEdit};