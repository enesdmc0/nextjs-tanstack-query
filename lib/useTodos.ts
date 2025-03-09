"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./action";

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

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ title }: { title: string }) => createTodo({ title }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
    })
}