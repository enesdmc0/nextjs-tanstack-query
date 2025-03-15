import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getTodos } from "@/lib/action";
import { Todos } from "@/components/todos";
import { NewTodo } from "../../components/new-todo";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <main className="min-h-screen flex flex-col items-center gap-8 py-10 px-4">
      <NewTodo />
      <Suspense fallback={<div>Suspense Loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Todos />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
};

export default Home;
