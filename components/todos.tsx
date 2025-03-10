"use client";
import { useTodos } from "@/lib/useTodos";
import { TodoItem } from "./todo-item";

export const Todos = () => {
  const { data, isPending } = useTodos();

  if (isPending) return <div className="text-white">Yükleniyor...</div>;

  return (
    <div className="w-full max-w-md space-y-2 grid grid-cols-2 gap-5">
      <div className="flex flex-col gap-5">
        {data
          ?.filter((x) => !x.completed)
          .map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
      </div>

      <div className="flex flex-col gap-5">
        {data
          ?.filter((x) => x.completed)
          .map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
      </div>
    </div>
  );
};
