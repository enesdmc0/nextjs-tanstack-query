"use client";
import { getTodos } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

interface Todo {
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
    queryFn: () => getTodos(),
  });
console.log(data);
  return (
    <div>
      {data?.items?.map((post: Todo) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default Posts;
