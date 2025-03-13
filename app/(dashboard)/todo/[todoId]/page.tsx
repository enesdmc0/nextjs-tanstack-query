import Link from "next/link";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getTodo } from "@/lib/action";
import TodoDetail from "@/components/todo-detail";

interface Props {
  params: Promise<{ todoId: string }>;
}

const TodoPage = async ({ params }: Props) => {
  const queryClient = new QueryClient();
  const { todoId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["todo", todoId],
    queryFn: () => getTodo(todoId),
  });

  return (
    <main className="min-h-screen flex flex-col items-center gap-8 py-10 px-4">
      <Link href="/" className="font-bold text-white">
        Back to Home
      </Link>
      <h1 className="text-white text-2xl">Todo Detayı</h1>
      <Suspense fallback={<div className="text-white">Todo Yükleniyor...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TodoDetail todoId={todoId} />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
};

export default TodoPage;
