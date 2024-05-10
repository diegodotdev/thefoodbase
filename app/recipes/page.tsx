import { fetchAllRecipes } from "@/lib/actions/recipe.actions";
import PageHeader from "@/components/page-header";
import Recipes from "@/components/recipes";

export default async function Page() {
  const data = await fetchAllRecipes();

  return (
    <div>
      <PageHeader title="Recipes" breadcrumb="Home > Recipes" />
      <Recipes data={data as any} />
    </div>
  );
}
