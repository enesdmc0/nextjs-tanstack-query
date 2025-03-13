"use server";
import PocketBase from 'pocketbase';
import { cookies } from 'next/headers';


export const getPocketBase = async () => {
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
