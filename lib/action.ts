"use server"
// import { revalidatePath } from "next/cache";
import { pb, Todo } from "./pocketbase";

export const getTodos = async () => {
    const todos = await pb.collection("todos").getList(1, 30, {
        headers: { x_token: process.env.POCKETBASE_TOKEN! },
    });
    return todos?.items as Todo[];
};

export const createTodo = async (title: string) => {
    const todo = await pb.collection("todos").create({
        title,
        completed: false,
    });
    // revalidatePath("/")
    return todo as Todo;
}

export const deleteTodo = async (id: string) => {
    await pb.collection("todos").delete(id);
    // revalidatePath("/")
    return { success: true }
}

export const updateTodo = async (id: string, completed: boolean) => {
    await pb.collection("todos").update(id, {
        completed,
    });
    // revalidatePath("/")
    return { success: true }
}