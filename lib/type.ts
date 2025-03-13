export interface User {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    id: string;
    name: string;
    updated: string;
    verified: boolean;
}

export interface Todo {
    collectionId: string;
    collectionName: string;
    completed: boolean;
    created: string;
    id: string;
    title: string;
    updated: string;
}

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