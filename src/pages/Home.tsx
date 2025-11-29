import { AddTodoSection } from "../components/homepage/todo-section/AddTodoSection";
import { TodoListSection } from "../components/homepage/todo-section/TodoListSection";

function Home() {
    return (
        <div className="w-[600px] mx-auto">
            <h2 className="text-center font-bold text-2xl mt-4">Create & Manage Todos</h2>

            <AddTodoSection />
            <TodoListSection />
        </div>
    );
}

export {Home};