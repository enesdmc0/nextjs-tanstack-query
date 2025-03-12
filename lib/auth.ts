"use server";

import { pb } from "./pocketbase";

export interface ActionResponse {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof LoginFormData]?: string[];
    };
}

export interface LoginFormData {
    email: string;
    password: string;
}


export const login = async (prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> => {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const authData = await pb.collection("users").authWithPassword(email, password);
        console.log(authData);
        return { success: true, message: "Login successful" };
    }
    catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}