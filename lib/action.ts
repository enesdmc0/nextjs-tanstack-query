export const getPosts = async () => {
    return await fetch("https://api.vercel.app/blog").then((res) => res.json());
};