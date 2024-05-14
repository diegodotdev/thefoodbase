import PageHeader from "@/components/page-header";
import Recipes from "@/components/recipes";
import { getAllRecipes } from "@/lib/actions/recipes.actions";

export default async function Page() {
  const data = await getAllRecipes();

  return (
    <div>
      <PageHeader title="Recipes" breadcrumb="Home > Recipes" />
      <Recipes data={data as any} />
    </div>
  );
}
