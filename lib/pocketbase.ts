import Pocketbase from 'pocketbase';

export const pb = new Pocketbase(process.env.POCKETBASE_URL);

export const getCurrentUser = () => {
    return pb.authStore.isValid ? pb.authStore.record : null;
}