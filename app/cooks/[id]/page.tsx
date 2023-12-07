import { fetchCook } from "@/lib/request";
import Image from "next/image";
import type { Recipe } from "@/types";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const data: Recipe[] = await fetchCook(params?.id);

  return (
    <div className="py-10 min-h-[73vh] flex flex-col gap-8">
      <div className="w-full h-[20vh] flex justify-start items-center gap-2">
        <Image
          src={data[0]?.avatar}
          alt="avatar"
          width={200}
          height={200}
          className="w-[80px] h-[80px] rounded-full object-cover"
        />
        <p className="font-[600] text-xl">{data[0]?.username}</p>
      </div>
      <div className="w-full grid grid-cols-5 gap-4">
        {data?.map((i) => (
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
