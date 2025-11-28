import { useState } from "react";
import type { TodoFilterType } from "../../../lib/typescript/todo";
import { TodoGrid } from "./TodoGrid";
import { useTodoStore } from "../../../zustand/store";

function TodoListSection() {
    const todos = useTodoStore((state) => state.todos);
    const todoFilter = useTodoStore((state) => state.filter);

    const [filter, setFilter] = useState<TodoFilterType>(todoFilter);

    function switchFilter(mode: TodoFilterType) {
        useTodoStore.setState({filter: mode})
        setFilter(mode);
    }

    return (
        <section>
            <div className="text-center mt-4 font-bold text-2xl">Todos</div>

            {/* Filter select section */}
            <section className="flex justify-center items-center gap-4 mt-4">
                <button type="button" className={`${filter ==="All" ? `bg-green-500` : `bg-blue-500`} text-white rounded-full p-2 px-6 py-2 cursor-pointer`} onClick={() => switchFilter("All")}>All</button>

                <button type="button" className={`${filter ==="Completed" ? `bg-green-500` : `bg-blue-500`} text-white rounded-full p-2 px-6 py-2 cursor-pointer`} onClick={() => switchFilter("Completed")}>Completed</button>
            </section>

            <TodoGrid todos={todos} filter={filter} />
        </section>
    );
}

export {TodoListSection};