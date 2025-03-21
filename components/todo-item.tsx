import Link from "next/link";
import { useState } from "react";
import { Todo } from "@/lib/type";
import { useDeleteTodo, useUpdateTodoStatus } from "@/lib/useTodos";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const [expandedTodo, setExpandedTodo] = useState<string | null>(null);

  const { mutate: deleteMutate, isPending: isPendingDelete } = useDeleteTodo();
  const { mutate: updateMutate, isPending: isUpdatePending } = useUpdateTodoStatus();

  const handleUpdate = (todo: Todo) => {
    updateMutate({
      id: todo.id,
      completed: !todo.completed,
    });
  };

  const handleDelete = (id: string) => {
    deleteMutate({ id });
  };

  return (
    <div
      key={todo.id}
      className={`bg-gray-800 rounded-md p-3 transition-all ${
        todo.completed ? "opacity-60" : "opacity-100"
      }`}
    >
      <div className="flex items-center justify-between">
        <Link href={`/todo/${todo.id}`} className="flex items-center gap-3">
          <button
            disabled={isUpdatePending}
            onClick={() => handleUpdate(todo)}
            className={` disabled:cursor-not-allowed size-5 flex-shrink-0 border rounded-md flex items-center justify-center transition-colors ${
              todo.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-400 hover:border-white"
            }`}
          >
            {todo.completed && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </button>
          <span className={`text-white ${todo.completed ? "line-through text-gray-400" : ""}`}>
            {todo.title}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExpandedTodo(expandedTodo === todo.id ? null : todo.id)}
            className=" text-gray-400 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      {expandedTodo === todo.id && (
        <div className="mt-2 pt-2 border-t border-gray-700">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Oluşturma: {new Date(todo.created).toLocaleString("tr-TR")}</span>
            <button
              disabled={isPendingDelete}
              onClick={() => handleDelete(todo.id)}
              className="disabled:cursor-not-allowed text-red-400 hover:text-red-300 px-2 py-1"
            >
              Sil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
