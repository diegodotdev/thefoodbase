import { GetServerSidePropsContext } from "next";
import type { User } from "@/types";
import Head from "next/head";
import Link from "next/link";

type Props = {
  result: User;
};

export default function Cook({ result }: Props) {
  return (
    <div className="py-10 flex flex-col gap-8">
      <Head>
        <title>The Foodbase | {result?.name}</title>
      </Head>
      <div className="w-full flex justify-start items-center gap-2">
        <img
          src={result?.image}
          alt={result?.name}
          className="rounded-full object-cover"
        />
        <p className="text-2xl font-[600]">{result?.name}</p>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 place-items-start">
        {result?.recipes?.map((recipe) => (
          <Link
            href={`/recipes/${recipe?.id}`}
            className="w-full"
            key={recipe?.id}
          >
            <div className="w-full flex flex-col gap-2">
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cooks/${id}`
  );
  const result = await response.json();

  return {
    props: {
      result,
    },
  };
};
