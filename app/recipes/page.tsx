import { fetchAllRecipes } from "@/lib/actions/recipe.actions";
import PageHeader from "@/components/page-header";
import Recipes from "@/components/recipes";
import { Recipe } from "@prisma/client";

export default async function Page() {
  const data = await fetchAllRecipes();

  return (
    <div>
      <PageHeader title="Recipes" breadcrumb="Home > Recipes" />
      <Recipes data={data as Recipe[]} />
    </div>
  );
}
