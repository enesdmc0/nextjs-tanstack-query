import { Client } from "./client";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/");
  }

  return <Client />;
};

export default LoginPage;
