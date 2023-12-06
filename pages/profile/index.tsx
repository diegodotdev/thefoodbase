import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import prisma from "@/db/prisma";
import type { User } from "@/types";
import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Trash } from "lucide-react";
import { deleteRecipe } from "@/lib/requests";

type Props = {
  result: User;
};

export default function Profile({ result }: Props) {
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
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-start">
        {result?.recipes?.map((recipe) => (
          <div className="w-full" key={recipe?.id}>
            <div className="w-full flex flex-col gap-2">
              <img
                src={recipe?.image}
                alt={recipe?.title}
                className="w-full rounded-lg h-[250px]"
              />
              <p className="font-[600]">{recipe?.title}</p>
            </div>
            <div className="w-full flex items-center gap-2">
              <Link href={`/recipes/${recipe?.id}`} className="w-1/2">
                <Button className="w-full">
                  <ExternalLink size="15px" />
                </Button>
              </Link>
              <Button
                className="w-1/2"
                variant="destructive"
                onClick={() =>
                  deleteRecipe(recipe?.id).then(() => window.location.reload())
                }
              >
                <Trash size="15px" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cooks/${user?.id}`
  );
  const result = await response.json();

  return {
    props: {
      result,
    },
  };
};
