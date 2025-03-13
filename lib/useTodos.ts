"use client"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, getTodo, getTodos, updateTitle, updateTodo } from "./action";

export const useTodos = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: getTodos
    })
}

export const useTodo = (id: string) => {
    return useQuery({
        queryKey: ["todo", id],
        queryFn: () => getTodo(id)
    })
}


export const useUpdateTodoStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, completed }: { id: string; completed: boolean }) => updateTodo(id, completed),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
    })
}

// export const useUpdateTodoStatus = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
//             updateTodo(id, completed),

//         // Optimistic update ekleyelim
//         onMutate: async ({ id, completed }) => {
//             // Önceki verileri sakla
//             await queryClient.cancelQueries({ queryKey: ["todos"] });
//             const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

//             // Optimistic update yap
//             queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
//                 old.map((todo) =>
//                     todo.id === id ? { ...todo, completed } : todo
//                 )
//             );

//             return { previousTodos };
//         },

//         // Hata durumunda eski verilere geri dön
//         onError: (_, __, context) => {
//             if (context?.previousTodos) {
//                 queryClient.setQueryData(["todos"], context.previousTodos);
//             }
//         },

//         // Her durumda veriyi yeniden doğrula
//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ["todos"] });
//         },
//     });
// };

export const useUpdateTodoTitle = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, title }: { id: string; title: string }) => updateTitle(id, title),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["todo", id] })
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        }
    })

}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id }: { id: string }) => deleteTodo(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
    })
}

// export const useDeleteTodo = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ id }: { id: string }) => deleteTodo(id),

//         // Optimistic update ekleyelim
//         onMutate: async ({ id }) => {
//             await queryClient.cancelQueries({ queryKey: ["todos"] });
//             const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

//             queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
//                 old.filter((todo) => todo.id !== id)
//             );

//             return { previousTodos };
//         },

//         onError: (_, __, context) => {
//             if (context?.previousTodos) {
//                 queryClient.setQueryData(["todos"], context.previousTodos);
//             }
//         },

//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ["todos"] });
//         },
//     });
// };

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ title }: { title: string }) => createTodo({ title }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] })
    })
}

// export const useCreateTodo = () => {



//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: ({ title }: { title: string }) => createTodo({ title }),

//         // Yeni todo için optimistic update
//         onMutate: async ({ title }) => {
//             await queryClient.cancelQueries({ queryKey: ["todos"] });
//             const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);

//             // Geçici bir ID ile yeni todo ekle
//             const optimisticTodo: Todo = {
//                 id: `temp-${Date.now()}`,
//                 title,
//                 completed: false,
//                 created: new Date().toISOString(),
//                 updated: new Date().toISOString(),
//                 collectionId: '',
//                 collectionName: 'todos',
//             };

//             queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
//                 [optimisticTodo, ...old]
//             );

//             return { previousTodos };
//         },

//         onError: (_, __, context) => {
//             if (context?.previousTodos) {
//                 queryClient.setQueryData(["todos"], context.previousTodos);
//             }
//         },

//         onSettled: () => {
//             queryClient.invalidateQueries({ queryKey: ["todos"] });
//         },
//     });
// };