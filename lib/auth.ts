"use server";

import { cookies } from "next/headers";
import { getPocketBase } from "./pocketbase";
import { redirect } from "next/navigation";

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
        const pb = await getPocketBase();
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        const authData = await pb.collection("users").authWithPassword(email, password);

        const cookieStore = await cookies();
        cookieStore.set('pb_auth', pb.authStore.exportToCookie().split('=')[1].split(';')[0], {
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7 // 1 hafta
        });

        console.log(authData);
        return { success: true, message: "Login successful" };
    }
    catch (error) {
        return { success: false, message: error instanceof Error ? error.message : "An unknown error occurred" };
    }
}

export const register = async (prevState: RegisterActionResponse | null, formData: FormData): Promise<RegisterActionResponse> => {
    try {
        const pb = await getPocketBase();
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
            passwordConfirm,
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


export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('pb_auth');
    redirect('/login');
}


export async function getUser() {
    const pb = await getPocketBase();

    if (pb.authStore.isValid) {
        try {
            return pb.authStore.record;
        } catch {
            const cookieStore = await cookies();
            cookieStore.delete('pb_auth');
            return null;
        }
    }

    return null;
}