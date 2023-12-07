"use client";

import { useState, useEffect } from "react";
import { fetchRecipes } from "@/lib/request";
import type { Recipe } from "@/types";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRecipes().then((data) => setRecipes(data));
  }, []);

  const filtered = recipes?.filter((recipe) =>
    recipe?.title?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="py-10 min-h-[73vh] flex flex-col gap-4">
      <div className="w-full h-[12vh] flex justify-end items-center">
        <Input
          className="w-[400px]"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="w-full grid grid-cols-5 gap-4">
        {filtered?.map((i) => (
          <Link
            href={`/recipes/${i.id}`}
            className="flex flex-col gap-2 w-full"
            key={i?.id}
          >
            <Image
              src={i.image}
              alt={i.title}
              width={400}
              height={400}
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <p>{i.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
