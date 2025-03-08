"use client";

import { createTodo } from "@/lib/action";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState, useTransition } from "react";

export const NewTodo = () => {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const formData = new FormData();
    formData.append("title", title);

    startTransition(async () => {
      try {
        await createTodo(formData);
        setTitle("");
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      } catch (error) {
        console.error("An error occurred while creating a todo", error);
      }
    });
  };

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
          disabled={isPending}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending || !title.trim()}
        >
          {isPending ? "Ekleniyor..." : "Ekle"}
        </button>
      </div>
    </form>
  );
};
