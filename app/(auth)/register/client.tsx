"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

import { register } from "@/lib/auth";
import { RegisterActionResponse } from "@/lib/type";

const initialState: RegisterActionResponse = {
  success: false,
  message: "",
};

const Client = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(register, initialState);

  useEffect(() => {
    console.log(state, "register state");
    if (state.success) {
      router.push("/login");
    }
  }, [state]);

  return (
    <main className="min-h-screen bg-black flex flex-col items-center gap-8 py-10 px-4">
      <h1 className="text-white font-semibold text-3xl">Register Page</h1>
      <form action={action} className="flex flex-col gap-5">
        <input
          name="name"
          type="text"
          placeholder="Name..."
          className="bg-white p-2 rounded-md outline-none "
        />
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
        <input
          name="passwordConfirm"
          type="text"
          placeholder="Password Confirm..."
          className="bg-white p-2 rounded-md outline-none "
        />
        <button
          disabled={isPending}
          className="p-2 bg-blue-500 rounded-md text-white font-semibold"
        >
          {isPending ? "Loading..." : "Register"}
        </button>
        <Link href="/login" className="text-white text-sm ml-auto underline">
          Login
        </Link>

        {state.message && (
          <p className={state.success ? "text-green-500" : "text-red-500"}>{state.message}</p>
        )}
      </form>
    </main>
  );
};

export default Client;
