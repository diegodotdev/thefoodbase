import PageHeader from "@/components/page-header";
import Recipes from "@/components/recipes";
import { getRecipesByCategory } from "@/lib/actions/recipes.actions";
import { capitalizeFirstLetter } from "@/lib/utils";

export default async function Category({ params }: { params: { id: string } }) {
  const category = capitalizeFirstLetter(params.id);
  const data = await getRecipesByCategory(category);

  return (
    <div className="w-full min-h-[82vh] py-5">
      <PageHeader
        title={category}
        breadcrumb={`Home > Categories > ${category}`}
      />
      <Recipes data={data} />
    </div>
  );
}
