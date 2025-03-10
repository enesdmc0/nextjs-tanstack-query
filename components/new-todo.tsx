"use client";
import { useCreateTodo } from "@/lib/useTodos";
import React, { useState } from "react";

export const NewTodo = () => {
  const [title, setTitle] = useState("");
  const { mutate, error, isError, isPending } = useCreateTodo();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      mutate({ title });
      setTitle("");
    } catch (error) {
      console.error("An error occurred while creating a todo", error);
    }
  };

  if (isError) return <div className="text-red-500">Bir hata oluştu: {error.message}</div>;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md gap-3">
      <h1 className="text-2xl font-bold text-white">Todo List</h1>
      <div className="flex items-center gap-2">
        <input
          className="w-full bg-white px-4 py-2 rounded-md outline-none"
          placeholder="Yeni görev ekle..."
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!title.trim() || isPending}
        >
          {isPending ? "Ekleniyor..." : "Ekle"}
        </button>
      </div>
    </form>
  );
};
