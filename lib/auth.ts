"use server";

import { pb } from "./pocketbase";

export interface LoginActionResponse {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof LoginFormData]?: string[];
    };
}

export interface RegisterActionResponse {
    success: boolean;
    message: string;
    errors?: {
        [K in keyof RegisterFormData]?: string[];
    };
}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface RegisterFormData {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
}


export const login = async (prevState: LoginActionResponse | null, formData: FormData): Promise<LoginActionResponse> => {
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

export const register = async (prevState: RegisterActionResponse | null, formData: FormData): Promise<RegisterActionResponse> => {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const passwordConfirm = formData.get("passwordConfirm") as string;
        const name = formData.get("name") as string;

        if (password !== passwordConfirm) {
            return { success: false, message: "Passwords do not match", errors: { password: ["Passwords do not match"], passwordConfirm: ["Passwords do not match"] } };
        }

        const user = await pb.collection("users").create({
            email,
            password,
            emailVisibility: true,
            verified: false, // TODO: Send verification email
            name,
        });
        console.log(user);
        return { success: true, message: "Registration successful" };
    }
    catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}