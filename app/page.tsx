import Posts from "./posts";
import { getPosts } from "@/lib/action";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const Home = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["todos"],
    queryFn: getPosts,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Posts />
    </HydrationBoundary>
  );
};

export default Home;
