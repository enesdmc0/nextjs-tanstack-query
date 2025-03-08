"use client";
import { getTodos } from "@/lib/action";
import { Todo } from "@/lib/pocketbase";
import { useQuery } from "@tanstack/react-query";

export const Posts = () => {
  const { data } = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos(),
  });
  console.log(data);
  return (
    <div>
      {data?.map((post: Todo) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};
