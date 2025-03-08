"use server"
// import { revalidatePath } from "next/cache";
import { pb, Todo } from "./pocketbase";

export const getTodos = async () => {
    try {
        const todos = await pb.collection("todos").getList(1, 30, {
            headers: { x_token: process.env.POCKETBASE_TOKEN! },
        });
        return todos?.items as Todo[];
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while fetching todos")
    }
};

export const createTodo = async (formData: FormData) => {
    try {
        const title = formData.get("title") as string;

        if (!title || title.trim() === "") {
            throw new Error("Title is required")
        }

        const todo = await pb.collection("todos").create({
            title,
            completed: false,
        });
        // revalidatePath("/")
        return todo as Todo;
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while creating a todo")
    }
}

export const deleteTodo = async (id: string) => {
    try {
        await pb.collection("todos").delete(id);
        // revalidatePath("/")
        return { success: true }
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while deleting a todo")
    }
}

export const updateTodo = async (id: string, completed: boolean) => {
    try {
        await pb.collection("todos").update(id, {
            completed,
        });
        // revalidatePath("/")
        return { success: true }
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while updating a todo")
    }
}