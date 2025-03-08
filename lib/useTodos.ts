"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, getTodos, updateTodo } from "./action";
import { Todo } from "./pocketbase";

export const useTodos = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: getTodos
    })
}

export const useUpdateTodoStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, completed }: { id: string; completed: boolean }) => updateTodo(id, completed),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
    })
}


export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteTodo(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
    })
}

export const useOptimisticUpdate = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, completed }: { id: string; completed: boolean }) => updateTodo(id, completed),
        onMutate: async ({ id, completed }) => {
            await queryClient.cancelQueries({ queryKey: ["todos"] });
            const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

            queryClient.setQueryData<Todo[]>(["todos"], (old) =>
                old?.map((todo) => todo.id === id ? { ...todo, completed } : todo))
            return { previousTodos }
        },
        onError: (err, variables, context) => {
            queryClient.setQueryData(["todos"], context?.previousTodos)
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] })

    })
}