"use server"
import { pb, Todo } from "./pocketbase";

export const getTodos = async () => {
    const todos = await pb.collection("todos").getList(1, 30, {
        headers: { x_token: process.env.POCKETBASE_TOKEN! },
    });

    return todos?.items as Todo[];
};