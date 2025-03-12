import { cookies } from 'next/headers';
import PocketBase from 'pocketbase';

export interface Todo {
    collectionId: string;
    collectionName: string;
    completed: boolean;
    created: string;
    id: string;
    title: string;
    updated: string;
}


export async function getPocketBase() {
    const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

    if (typeof window === 'undefined') {
        const cookieStore = await cookies();
        const authCookie = cookieStore.get('pb_auth');

        if (authCookie) {
            pb.authStore.loadFromCookie(`pb_auth=${authCookie.value}`);
        }
    }
    return pb;
}

export const getClientPocketbase = () => {
    return new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);
}
