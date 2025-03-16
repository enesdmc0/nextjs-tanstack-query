"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { login } from "@/lib/auth";
import { LoginActionResponse } from "@/lib/type";

const initialState: LoginActionResponse = {
  success: false,
  message: "",
};

export const Client = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(login, initialState);

  useEffect(() => {
    console.log(state, "login state");
    if (state.success) {
      router.push("/");
    }
  }, [state, router]);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center gap-8 py-10 px-4">
      <h1 className="text-white font-semibold text-3xl">Login Page</h1>
      <form action={action} className="flex flex-col gap-5">
        <input
          name="email"
          type="text"
          placeholder="Email..."
          className="bg-white p-2 rounded-md outline-none "
        />
        <input
          name="password"
          type="text"
          placeholder="Password..."
          className="bg-white p-2 rounded-md outline-none "
        />
        <button
          disabled={isPending}
          className="p-2 bg-blue-500 rounded-md text-white font-semibold"
        >
          {isPending ? "Loading..." : "Login"}
        </button>
        <Link href="/register" className="text-white text-sm ml-auto underline">
          Register
        </Link>
        {state.message && (
          <p className={state.success ? "text-green-500" : "text-red-500"}>{state.message}</p>
        )}
      </form>
    </main>
  );
};
