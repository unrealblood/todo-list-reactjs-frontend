import { useEffect } from "react";
import type { TodoFilterType, TodoType } from "../../../lib/typescript/todo";
import { TodoGrid } from "./TodoGrid";
import { useTodoStore } from "../../../zustand/store";
import { useGetAllUserTodos } from "../../../lib/tanstack-query/todo";

function TodoListSection() {
    const userId = localStorage.getItem("userId") as string;
    
    const {data, isFetched} = useGetAllUserTodos(userId);

    let todos: TodoType[] = useTodoStore((state) => state.todos) as TodoType[];
    useEffect(() => {
        if(isFetched) {
            //useTodoStore.getState().setTodos(data.todos);
            useTodoStore.setState({todos: data.todos});
        }
    }, [isFetched]);

    const todoFilter = useTodoStore((state) => state.filter);
    
    function switchFilter(mode: TodoFilterType) {
        useTodoStore.setState({filter: mode});
    }

    return (
        <section>
            <div className="text-center mt-4 font-bold text-2xl">Todos</div>

            {/* Filter select section */}
            <section className="flex justify-center items-center gap-4 mt-4">
                <button type="button" className={`${todoFilter ==="All" ? `bg-green-500` : `bg-blue-500`} text-white rounded-full p-2 px-6 py-2 cursor-pointer`} onClick={() => switchFilter("All")}>All</button>

                <button type="button" className={`${todoFilter ==="Completed" ? `bg-green-500` : `bg-blue-500`} text-white rounded-full p-2 px-6 py-2 cursor-pointer`} onClick={() => switchFilter("Completed")}>Completed</button>
            </section>

            <TodoGrid todos={todos} filter={todoFilter} />
        </section>
    );
}

export {TodoListSection};