"use server"
import { revalidatePath } from "next/cache";
import { getPocketBase } from "./pocketbase";
import { getUser } from "./auth";
import { Todo } from "./type";

const x_token = process.env.POCKETBASE_TOKEN!

// const promise = (ms: number) => {
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }


export const getTodos = async () => {
    try {
        // await promise(1000);
        const pb = await getPocketBase();
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

export const getTodo = async (id: string) => {
    try {
        // await promise(1000);
        const pb = await getPocketBase();

        const todo = await pb.collection("todos").getOne(id, {
            headers: { x_token },
        })
        return todo as Todo;
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while fetching a todo")
    }
}

export const createTodo = async ({ title }: { title: string }) => {
    try {
        // await promise(1000);
        if (!title || title.trim() === "") {
            throw new Error("Title is required")
        }
        const pb = await getPocketBase();

        const user = await getUser();
        if (!user) {
            throw new Error("User not found")
        }

        const todo = await pb.collection("todos").create({
            title,
            completed: false,
            userId: user.id,
        }, {
            headers: { x_token },
        });
        revalidatePath("/")
        return todo as Todo;
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while creating a todo")
    }
}

export const deleteTodo = async (id: string) => {
    try {
        // await promise(1000);
        const pb = await getPocketBase();

        await pb.collection("todos").delete(id, {
            headers: { x_token },
        });
        revalidatePath("/")
        return { success: true }
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while deleting a todo")
    }
}

export const updateTodo = async (id: string, completed: boolean) => {
    try {
        // await promise(1000);
        const pb = await getPocketBase();

        await pb.collection("todos").update(id, {
            completed,
        }, {
            headers: { x_token },
        });
        revalidatePath("/")

        return { success: true }
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while updating a todo")
    }
}

export const updateTitle = async (id: string, title: string) => {
    try {
        // await promise(1000);
        const pb = await getPocketBase();

        await pb.collection("todos").update(id, {
            title
        }, {
            headers: { x_token },
        })
        revalidatePath("/")
        revalidatePath(`/${id}`)
        return { success: true }
    }
    catch (error) {
        console.log(error)
        throw new Error("An error occurred while updating a todo")
    }
} 