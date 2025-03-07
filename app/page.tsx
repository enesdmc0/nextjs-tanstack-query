import Posts from "./todos";
import { getTodos } from "@/lib/action";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const Home = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  );
};

export default Home;
