import { useState } from "react";
import type { TodoModeType, TodoType } from "../../../../lib/typescript/todo";
import { TodoItemEdit } from "./TodItemEdit";
import { TodoItemView } from "./TodoItemView";

function TodoItem({length, index, todo}: {length: number, index: number, todo: TodoType}) {
    const [mode, setMode] = useState<TodoModeType>("View");

    return (
        <div className="w-full">
            {
            (mode === "View")
            ?
            <TodoItemView length={length} index={index} setMode={setMode} todo={todo}/>
            :
            <TodoItemEdit index={index} length={length} setMode={setMode} todo={todo} />
            }
        </div>
    );
}

export {TodoItem};