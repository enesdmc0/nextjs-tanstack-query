import Pocketbase from 'pocketbase';

export interface Todo {
    collectionId: string;
    collectionName: string;
    completed: boolean;
    created: string;
    id: string;
    title: string;
    updated: string;
}

export const pb = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

// export const getCurrentUser = () => {
//     return pb.authStore.isValid ? pb.authStore.record : null;
// }