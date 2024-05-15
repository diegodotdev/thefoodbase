import Image from "next/image";
import Link from "next/link";
import { getRecentRecipes } from "@/lib/actions/recipes.actions";
import { CATEGORIES } from "@/constants";

export default async function Home() {
  const data = await getRecentRecipes();

  return (
    <div className="w-full min-h-[90vh] py-5 flex flex-col gap-[10vh] md:gap-0">
      <div className="w-full h-[60vh] flex gap-5 justify-between flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center md:items-start gap-5">
          <p className="text-4xl md:text-6xl font-[600]">
            Your Daily Dish
            <br />A{" "}
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Food
            </span>{" "}
            Journey
          </p>
        </div>
        <div className="w-full md:w-1/2 h-full grid place-items-center">
          <div className="relative w-72 md:w-96 h-72 md:h-96 rounded-full overflow-hidden">
            <Image
              src="/assets/hero.jpg"
              alt="hero image"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col">
        <div className="w-full md:w-1/2 h-[40vh] md:h-[60vh] grid place-items-center">
          <div className="w-3/4 h-1/2 relative rounded-lg overflow-hidden">
            <Image
              src="/assets/photography.jpg"
              alt="person taking photo of food"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 py-5 md:h-[60vh] flex flex-col gap-5 justify-center items-center">
          <p className="text-3xl md:text-4xl font-[600]">
            Share Your{" "}
            <span className="bg-clip-text bg-gradient-to-tr from-red-500 via-orange-500 to-yellow-500 text-transparent">
              Recipes
            </span>
          </p>
          <p className="text-center w-4/5 opacity-80">
            Share your creations with other cooks. Learn new recipes as you
            inspire others as well. All within a simple process.
          </p>
          <Link href="/add-recipe">
            <button className="px-5 py-2 rounded-lg bg-black text-white">
              Create New Recipe
            </button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-5 min-h-[40vh] justify-center items-start">
        <div className="py-5">
          <p className="text-3xl font-[600]">Recent Recipes</p>
        </div>
        <div className="w-full grid place-items-start gap-5 lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
          {data?.map((i) => (
            <Link
              href={`/recipes/${i.id}`}
              className="w-full h-[200px] flex flex-col gap-2"
              key={i.id}
            >
              <div className="w-full h-full relative rounded-lg overflow-hidden ">
                <Image
                  src={i.image}
                  alt={i.title}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-[600]">{i.title}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-5 md:h-[40vh]">
        <div className="py-5">
          <p className="text-3xl font-[600]">Top Categories</p>
        </div>
        <div className="w-full md:flex md:items-center md:justify-evenly grid grid-cols-2 place-items-center gap-5">
          {CATEGORIES.map((i) => (
            <Link
              href={i.href}
              className="flex flex-col gap-2 items-center justify-center"
              key={i.id}
            >
              <div className="relative w-32 h-32 rounded-full overflow-hidden shadow">
                <Image
                  src={i.image}
                  alt={i.label}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="font-[600]">{i.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
