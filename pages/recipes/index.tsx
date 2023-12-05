import { useState } from "react";
import type { Recipe } from "@/types";
import Link from "next/link";
import Head from "next/head";

type Props = {
  result: Recipe[];
};

export default function Recipes({ result }: Props) {
  const [search, setSearch] = useState("");

  const filtered = result?.filter((recipe) =>
    recipe?.title?.toLowerCase()?.includes(search.toLowerCase())
  );
  return (
    <div className="py-10 flex flex-col gap-8">
      <Head>
        <title>The Foodbase | Recipes</title>
      </Head>
      <div className="w-full h-[12vh] flex justify-end items-center">
        <input
          className="w-full md:w-[400px] px-4 py-2 border border-gray-200 rounded-lg"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-start">
        {filtered?.map((recipe) => (
          <Link
            href={`/recipes/${recipe?.id}`}
            className="w-full"
            key={recipe?.id}
          >
            <div className="w-full aspect-square flex flex-col gap-2">
              <img
                src={recipe?.image}
                alt={recipe?.title}
                className="w-full rounded-lg h-[250px]"
              />
              <p className="font-[600]">{recipe?.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes`,
    {
      cache: "no-store",
    }
  );
  const result = await response.json();

  return {
    props: {
      result,
    },
  };
};
