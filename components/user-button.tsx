"use client";
import { useUser } from "@/lib/useUser";

export const UserButton = () => {
  const { data: user, isPending } = useUser();

  if (isPending) <div>User Loading...</div>;
  if (!user) <div>User not found</div>;

  return (
    <div>
      <div></div>
      <div className="flex flex-col gap-1 text-white">
        <p>
          {user?.name} - {user?.id}{" "}
        </p>
        <p className="text-sm">{user?.email}</p>
      </div>
    </div>
  );
};
