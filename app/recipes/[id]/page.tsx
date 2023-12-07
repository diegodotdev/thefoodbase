"use client";

import { fetchRecipe } from "@/lib/request";
import { Recipe } from "@prisma/client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Page({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<"ing" | "ins">("ing");

  useEffect(() => {
    fetchRecipe(params?.id).then((data) => {
      setRecipe(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="w-full h-[73vh] grid place-items-center">
        <Loader className="animate-spin" size="15px" />
      </div>
    );
  return (
    <div className="w-full flex gap-8 min-h-[73vh] py-10 flex-col md:flex-row ">
      <div className="w-full md:w-1/2 min-h-[73vh] flex justify-start items-center flex-col gap-4">
        <p className="text-lg font-[600] w-4/5 text-center">{recipe?.title}</p>
        <Image
          src={recipe?.image as string}
          alt={recipe?.title as string}
          width={500}
          height={500}
          className="w-full md:w-4/5 h-[250px] object-cover rounded-lg"
        />
        <div className="w-full md:w-4/5 flex justify-end items-center mx-auto">
          <Link href={`/cooks/${recipe?.userId}`}>
            <div className="flex items-center gap-1">
              <Image
                src={recipe?.avatar as string}
                alt="avatar"
                width={100}
                height={100}
                className="rounded-full h-[25px] w-[25px] object-cover"
              />
              <span>{recipe?.username}</span>
            </div>
          </Link>
        </div>
        <p className="w-full md:w-4/5 text-muted-foreground text-sm">
          Description:
          <br />
          {recipe?.description}
        </p>
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <div className="w-full md:w-4/5 mx-auto flex flex-col gap-4">
          <div className="w-full flex rounded-full overflow-hidden border border-gray-200">
            <button
              onClick={() => setActive("ing")}
              className={cn(
                "w-1/2 rounded-none py-2",
                active === "ing"
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground"
              )}
            >
              Ingredients
            </button>
            <button
              onClick={() => setActive("ins")}
              className={cn(
                "w-1/2 rounded-none py-2",
                active === "ins"
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground"
              )}
            >
              Instructions
            </button>
          </div>
        </div>
        <div className="w-full md:w-4/5 mx-auto flex flex-col gap-8">
          {active === "ing"
            ? recipe?.ingredients?.map((i, idx) => <p key={idx}>- {i}</p>)
            : recipe?.instructions?.map((i, idx) => (
                <p key={idx}>
                  {idx + 1}. {i}
                </p>
              ))}
        </div>
      </div>
    </div>
  );
}
