import { GetServerSidePropsContext } from "next";
import type { Recipe } from "@/types";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  result: Recipe;
};

export default function Recipe({ result }: Props) {
  const [active, setActive] = useState<"ing" | "ins">("ing");

  return (
    <div className="py-10 flex gap-8 min-h-[88vh] flex-col md:flex-row">
      <Head>
        <title>The Foodbase | {result?.title}</title>
      </Head>
      {/* Image */}
      <div className="w-full md:w-1/2 h-full flex justify-center items-center flex-col gap-4">
        <p className="text-xl font-[600]">{result?.title}</p>
        <img
          src={result?.image}
          alt={result?.title}
          className="w-full md:w-3/4 h-[300px] md:h-[250px] rounded-lg object-cover"
        />
        <div className="w-full md:w-3/4 flex items-center justify-start">
          <Link href={`/cooks/${result?.userId}`}>
            <div className="flex items-center gap-1">
              <img
                src={result?.user?.image}
                alt="avatar"
                className="w-7 h-7 rounded-full object-cover"
              />
              <p className="font-[600]">{result?.user?.name}</p>
            </div>
          </Link>
        </div>
        <p className="w-full md:w-3/4">
          Description:
          <br />
          <span className="text-muted-foreground">{result?.description}</span>
        </p>
      </div>
      {/* Data */}
      <div className="w-full md:w-1/2">
        <div className="w-full md:w-4/5 mx-auto flex flex-col gap-4">
          {/* Buttons */}
          <div className="w-full rounded-full border border-black overflow-hidden">
            <button
              className={cn(
                "w-1/2 py-2",
                active === "ing" ? "bg-black text-background" : ""
              )}
              onClick={() => setActive("ing")}
            >
              Ingredients
            </button>
            <button
              className={cn(
                "w-1/2 py-2",
                active === "ins" ? "bg-black text-background" : ""
              )}
              onClick={() => setActive("ins")}
            >
              Instructions
            </button>
          </div>
          {/* Data */}
          {active === "ing"
            ? result?.ingredients?.map((i, idx) => <p key={idx}>· {i}</p>)
            : result?.instructions?.map((i, idx) => (
                <p key={idx}>
                  {idx + 1}. {i}
                </p>
              ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context?.params?.id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${id}`
  );
  const result = await response.json();

  return {
    props: {
      result,
    },
  };
};
