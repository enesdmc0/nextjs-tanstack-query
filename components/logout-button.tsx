"use client";
import { logout } from "@/lib/auth";
import { useTransition } from "react";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await logout();
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

export default LogoutButton;
