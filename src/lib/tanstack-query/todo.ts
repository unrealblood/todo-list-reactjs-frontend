import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { TodoType } from "../typescript/todo";

export const useAddTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (todo: TodoType) => {
            const res = await fetch("http://localhost:5000/todos/add-todo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            });

            const result = await res.json();

            if (!res.ok) throw new Error("Failed to create todo");

            return result;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
    });
}

export const useGetAllUserTodos = (userId: string) =>
  useQuery({
    queryKey: ["get-all-user-todos", userId],         // unique per id
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/todos/get-todos/${userId}`);
      
      const result = await res.json();

        if (result.error) throw new Error("Failed to get all user todos");

        return result;
    },
    enabled: !!userId                  // only run if id exists
});

export const useMarkTodoCompleted = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({_id, value}: {_id: string, value: boolean}) => {
            const res = await fetch("http://localhost:5000/todos/mark-completed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({_id, value}),
            });

            const result = await res.json();

            if (!res.ok) throw new Error("Failed to mark todo completed");

            return result;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["mark-todo-completed"] });
        }
    });
}