"use server"
import { pb, Todo } from "./pocketbase";

const x_token = process.env.POCKETBASE_TOKEN!

export const getTodos = async () => {
    try {
        const todos = await pb.collection("todos").getList(1, 30, {
            headers: { x_token },
        });
        return todos?.items as Todo[];
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while fetching todos")
    }
};

export const createTodo = async ({ title }: { title: string }) => {
    try {

        if (!title || title.trim() === "") {
            throw new Error("Title is required")
        }

        const todo = await pb.collection("todos").create({
            title,
            completed: false,
        }, {
            headers: { x_token },
        });
        return todo as Todo;
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while creating a todo")
    }
}

export const deleteTodo = async (id: string) => {
    try {
        await pb.collection("todos").delete(id, {
            headers: { x_token },
        });
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
        }, {
            headers: { x_token },
        });
        return { success: true }
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while updating a todo")
    }
}