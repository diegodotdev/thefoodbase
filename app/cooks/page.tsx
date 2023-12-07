"use client";

import { useState, useEffect } from "react";
import { fetchCooks } from "@/lib/request";
import type { Cook } from "@/types";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [cooks, setCooks] = useState<Cook[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCooks().then((data: Cook[]) => {
      const unique = [...new Map(data.map((m) => [m.username, m])).values()];
      setCooks(unique);
    });
  }, []);

  const filtered = cooks?.filter((recipe) =>
    recipe?.username?.toLowerCase().includes(search.toLowerCase())
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
            href={`/cooks/${i.userId}`}
            className="flex flex-col gap-2 w-full"
            key={i?.id}
          >
            <Image
              src={i.avatar}
              alt={i.username}
              width={400}
              height={400}
              className="w-full h-[200px] object-cover rounded-lg"
            />
            <p>{i.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
