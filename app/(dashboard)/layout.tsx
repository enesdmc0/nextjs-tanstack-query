import { Header } from "@/components/header";
import { getUser } from "@/lib/auth";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
  return (
    <div className="flex flex-col items-center gap-8 py-10 px-4">
      <Suspense fallback={<div>Suspense Header Loading...</div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Header />
        </HydrationBoundary>
      </Suspense>
      {children}
    </div>
  );
};

export default DashboardLayout;
