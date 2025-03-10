"use client";
import { FormEvent, useState } from "react";
import { useTodo, useUpdateTodoTitle } from "@/lib/useTodos";

interface Props {
  todoId: string;
}

const TodoDetail = ({ todoId }: Props) => {
  const { data } = useTodo(todoId);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState<string>(data?.title || "");
  const { mutate: updateTitleMutate, isPending: isPendingUpdateTitle } = useUpdateTodoTitle();

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    updateTitleMutate({ id: todoId, title: editedTitle });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={isPendingUpdateTitle}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              {isPendingUpdateTitle ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
            >
              İptal
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">{data?.title}</h2>
          <div className="flex items-center mb-4">
            <span className="mr-2">Durum:</span>
            <span className={data?.completed ? "text-green-400" : "text-yellow-400"}>
              {data?.completed ? "Tamamlandı" : "Devam Ediyor"}
            </span>
          </div>

          <div className="flex space-x-2 mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
            >
              Düzenle
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoDetail;
