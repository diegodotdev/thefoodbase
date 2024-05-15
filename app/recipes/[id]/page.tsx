import {
  getRecipesByCategory,
  getUniqueRecipe,
} from "@/lib/actions/recipes.actions";
import PageHeader from "@/components/page-header";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getUniqueRecipe(params?.id);
  const recipes: any = await getRecipesByCategory(data?.category as string);

  return (
    <div className="py-5 min-h-[82vh]">
      <PageHeader
        title={data?.title as string}
        breadcrumb={`Home > Recipes > ${data?.title}`}
      />
      <div className="w-full flex gap-5">
        {/* Left */}
        <div className="w-3/4 flex flex-col gap-10">
          {/* User and Date */}
          <div className="w-full flex justify-start items-center gap-5">
            <Link href={`/users/${data?.userId}`}>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full relative overflow-hidden">
                  <Image
                    src={data?.userAvatar as string}
                    alt="user avatar"
                    fill
                    className="object-cover w-full"
                  />
                </div>
                <p className="text-sm">{data?.userName}</p>
              </div>
            </Link>
            <p className="text-gray-400">/</p>
            <p className="text-sm">
              {moment(data?.createdAt).format("MMM DD, YYYY")}
            </p>
          </div>
          {/* Image */}
          <div className="w-full h-[500px] relative rounded-lg overflow-hidden">
            <Image
              src={data?.image as string}
              alt="recipe image"
              fill
              className="object-cover"
            />
          </div>
          {/* Dish Info */}
          <div className="w-full flex justify-center items-center">
            <div className="w-1/4 flex flex-col gap-2 border-r border-gray-400 justify-center items-center">
              <p>Prep time:</p>
              <p>{data?.prepTime}</p>
            </div>
            <div className="w-1/4 flex flex-col gap-2 justify-center items-center">
              <p>Servings:</p>
              <p>{data?.servings} servings</p>
            </div>
          </div>
          <p>{data?.description}</p>
          <div className="w-full flex flex-col gap-5 justify-start items-start">
            <p className="text-lg font-[600]">Ingredients</p>
            {data?.ingredients?.map((i: string, idx: number) => (
              <label key={idx} className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <p>{i}</p>
              </label>
            ))}
          </div>
          <div className="w-full flex flex-col gap-5 justify-start items-start">
            <p className="text-lg font-[600]">Instructions</p>
            {data?.instructions?.map((i: string, idx: number) => (
              <p key={idx}>
                {idx + 1}. {i}
              </p>
            ))}
          </div>
        </div>
        <div className="w-1/4 flex flex-col gap-5">
          <p className="text-lg font-[600]">Similar Recipes</p>
          {recipes?.slice(0, 9)?.map((i: any) => (
            <Link href={`/recipes/${i.id}`} className="w-full" key={i?.id}>
              <div className="w-full flex flex-col gap-2">
                <div className="w-full h-[200px] relative overflow-hidden rounded-lg">
                  <Image
                    src={i?.image}
                    alt={i?.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
