import { auth } from "@clerk/nextjs/server";
import RecipeForm from "@/components/recipe-form";
import { notFound } from "next/navigation";

export default function Page() {
  const { userId } = auth();

  if (!userId) return notFound();
  return <RecipeForm />;
}
