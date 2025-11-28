import { useTodoStore } from "../../zustand/store";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { AddTodoFormFieldsType } from "../../lib/react-hook-form/add-todo-form";

function AddTodoSection() {
    const { register, handleSubmit, reset } = useForm<AddTodoFormFieldsType>();
    
    function handleAddTodo(data: AddTodoFormFieldsType): SubmitHandler<AddTodoFormFieldsType> {
        useTodoStore.getState().addTodo({
            content: data.content,
            completed: false
        });
        
        reset();
    }

    return (
        <section className="flex flex-col justify-center items-center">
            <form onSubmit={handleSubmit(handleAddTodo)} className="mt-4 flex justify-center items-center gap-4">
                {/* React Hook Form */}
                <input type="text" className="w-[350px] bg-gray-200 p-2 rounded-full" placeholder="Enter todo" {...register("content", {
                    required: true
                })} />

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer bi-plus-square"></button>
            </form>
        </section>
    );
}

export {AddTodoSection};