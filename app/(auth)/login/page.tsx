"use client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { LoginActionResponse, login } from "@/lib/auth";

const initialState: LoginActionResponse = {
  success: false,
  message: "",
};

const LoginPage = () => {
  const router = useRouter();
  const [state, action, isPending] = useActionState(login, initialState);

  useEffect(() => {
    if (state.success) {
      router.push("/");
    }
  }, [state]);

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
        {state.message && (
          <p className={state.success ? "text-green-500" : "text-red-500"}>{state.message}</p>
        )}
      </form>
    </main>
  );
};

export default LoginPage;
