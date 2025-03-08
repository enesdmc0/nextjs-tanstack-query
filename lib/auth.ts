// import { pb } from "./pocketbase";

// export interface LoginData {
//     email: string;
//     password: string;
// }

// export interface RegisterData {
//     name: string;
//     email: string;
//     password: string;
//     passwordConfirm: string;
// }

// export const login = async ({ email, password }: LoginData) => {
//     try {
//         const authData = await pb.collection("users").authWithPassword(email, password);
//         return { success: true, authData }
//     }
//     catch (error) {
//         return { success: false, error }
//     }
// }

// export const register = async ({ name, email, password, passwordConfirm }: RegisterData) => {
//     try {
//         if (password !== passwordConfirm) {
//             throw new Error("Passwords do not match");
//         }
//         const user = await pb.collection("users").create({ name, email, password });

//         if (user) {
//             await pb.collection("users").authWithPassword(email, password);
//         }

//         return { success: true, data: user }
//     }
//     catch (error) {
//         return { success: false, error }
//     }
// }

// export const logout = async () => {
//     pb.authStore.clear();
// }

// export const getCurrentUser = () => {
//     return pb.authStore.isValid ? pb.authStore.record : null;
// }