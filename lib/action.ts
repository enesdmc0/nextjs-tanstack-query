"use server"
export const getTodos = async () => {
    return await fetch(`${process.env.POCKETBASE_URL}/api/collections/todos/records`, {
        headers: {
            x_token: process.env.POCKETBASE_TOKEN!,
        },
    }).then((res) => res.json());
};