import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { Todos } from "./todos";
import { NewTodo } from "./new-todo";
import { getTodos } from "@/lib/action";

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <main className="min-h-screen bg-black flex flex-col items-center gap-8 py-10 px-4">
      <NewTodo />

      <Suspense fallback={<div>Loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Todos />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
};

export default Home;
