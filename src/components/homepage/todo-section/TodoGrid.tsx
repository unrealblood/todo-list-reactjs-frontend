import type { TodoFilterType, TodoType } from "../../../lib/typescript/todo";
import { TodoItem } from "./todo-item/TodoItem";

function TodoGrid({todos, filter}: {todos: TodoType[], filter: TodoFilterType}) {
    const filteredTodos = (filter === "Completed") ? todos.filter((todo) => (todo.completed)) : todos;

    return (
        <div className="mt-4 border border-black rounded-xl p-4 flex flex-col justify-center items-center gap-4">
            {(filteredTodos.length > 0)
            ?
            filteredTodos.map((todo, index) => (
                <TodoItem key={index} length={todos.length} index={index} todo={todo} />
            ))
            :
            <p>No todos found. Maybe add one.</p>
            }
        </div>
    );
}

export {TodoGrid};