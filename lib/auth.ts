"use server";
import { cookies } from "next/headers";
import { getPocketBase } from "./pocketbase";
import { redirect } from "next/navigation";
import { LoginActionResponse, RegisterActionResponse, User } from "./type";

const promise = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

export const logout = async (): Promise<void> => {
    await promise(1000);
    const cookieStore = await cookies();
    cookieStore.delete('pb_auth');
    redirect('/login');
}

export const getUser = async (): Promise<User | null> => {
    const pb = await getPocketBase();

    if (pb.authStore.isValid) {
        try {
            return pb.authStore.record as User;
        } catch {
            const cookieStore = await cookies();
            cookieStore.delete('pb_auth');
            return null;
        }
    }

    return null;
}