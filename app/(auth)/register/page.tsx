import { Client } from "./client";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const user = await getUser();

  if (user) {
    redirect("/");
  }

  return <Client />;
};

export default RegisterPage;
