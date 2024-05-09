import { auth } from "@clerk/nextjs/server";
import RecipeForm from "@/components/recipe-form";

export default function Page() {
  const { userId } = auth();

  if (!userId) throw new Error("No user was found, refresh the page");
  return <RecipeForm userId={userId} />;
}
