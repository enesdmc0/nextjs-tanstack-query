import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getUser, logout } from "./auth"

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser
    })
}


export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    })
}