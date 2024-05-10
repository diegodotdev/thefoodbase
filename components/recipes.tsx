import { Recipe } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function Recipes({ data }: { data: Recipe[] }) {
  return (
    <div className="w-full py-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 place-items-start">
      {data?.map((i) => (
        <Link href={`/recipes/${i.id}`} className="w-full" key={i?.id}>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full h-[200px] relative overflow-hidden rounded-lg">
              <Image
                src={i?.image_url}
                alt={i?.title}
                fill
                className="object-cover"
              />
            </div>
            <p className="font-[600]">{i?.title}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
