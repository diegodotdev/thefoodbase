import PageHeader from "@/components/page-header";
import { CATEGORIES } from "@/constants";
import Link from "next/link";
import Image from "next/image";

export default function Categories() {
  return (
    <div className="w-full min-h-[82vh]">
      <PageHeader title="Categories" breadcrumb="Home > Categories" />

      <div className="w-full gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center">
        {CATEGORIES.map((i) => (
          <Link href={i.href} key={i.id} className="w-full h-[300px]">
            <div className="relative w-full h-full rounded-lg shadow overflow-hidden group">
              <Image
                src={i.image}
                alt={i.label}
                fill
                className="object-cover"
              />
              <div className="absolute z-50 top-0 right-0 bg-black/70 flex justify-start items-end p-5 w-full h-full group-hover:bg-black/50 duration-[.8s]">
                <p className="text-white font-[600] text-xl">{i.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
