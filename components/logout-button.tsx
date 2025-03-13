"use client";
import { useLogout } from "@/lib/useUser";
import { useTransition } from "react";

export const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();
  const { mutate } = useLogout();

  const handleClick = () => {
    startTransition(async () => {
      mutate();
    });
  };

  return (
    <button
      disabled={isPending}
      onClick={handleClick}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      {isPending ? "Logging out..." : "Logout"}
    </button>
  );
};
