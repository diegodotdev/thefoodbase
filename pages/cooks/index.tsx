import { useState } from "react";
import type { Cook } from "@/types";
import Link from "next/link";
import Head from "next/head";

type Props = {
  result: Cook[];
};

export default function Cooks({ result }: Props) {
  const [search, setSearch] = useState("");

  const filtered = result?.filter((cook) =>
    cook?.name?.toLowerCase()?.includes(search.toLowerCase())
  );
  return (
    <div className="py-10 flex flex-col gap-8">
      <Head>
        <title>The Foodbase | Cooks</title>
      </Head>
      <div className="w-full h-[12vh] flex justify-end items-center">
        <input
          className="w-full sm:w-[400px] px-4 py-2 border border-gray-200 rounded-lg"
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 place-items-start">
        {filtered?.map((cook) => (
          <Link href={`/cooks/${cook?.id}`} className="w-full" key={cook?.id}>
            <div className="w-full flex flex-col gap-2">
              <img
                src={cook?.image}
                alt={cook?.name}
                className="w-full rounded-lg object-cover h-[250px]"
              />
              <p className="font-[600]">{cook?.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cooks`,
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
