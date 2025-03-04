"use client";
import { getPosts } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

interface Post {
  id: number;
  date: string;
  title: string;
  author: string;
  content: string;
  category: string;
}

const Posts = () => {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getPosts(),
  });

  return (
    <div>
      {data.map((post: Post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default Posts;
