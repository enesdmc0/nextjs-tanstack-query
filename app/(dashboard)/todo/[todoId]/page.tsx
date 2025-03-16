import Link from "next/link";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getTodo } from "@/lib/action";
import TodoDetail from "@/components/todo-detail";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

// export async function generateStaticParams() {
//   const todos = await getTodos();

//   return todos.map((todo) => ({
//     todoId: todo.id,
//   }));
// }

interface Props {
  params: Promise<{ todoId: string }>;
}

const TodoPage = async ({ params }: Props) => {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

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

// Opsiyonel: Belirli bir süre sonra sayfaları otomatik yenileme (ISR)
export const revalidate = 3600; // 1 saat

// Opsiyonel: Sadece generateStaticParams'da belirtilen route'lara izin verme
// export const dynamicParams = false;

export default TodoPage;


// GenerateStaticParams ile ilgili notlar:

// generateStaticParams fonksiyonu, sayfanın statik olarak üretilmesi gereken parametreleri döndürmelidir.
// Burada kullanıcı login olmadan yani getUser fonksiyonu çalışmadan sayfaya erişim sağlanamayacağı için, generateStaticParams fonksiyonu kullanılamaz.