"use client";

import { deleteRecipe } from "@/lib/request";
import { useState, useEffect } from "react";
import { fetchCook } from "@/lib/request";
import type { Recipe } from "@/types";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { toast } from "@/components/ui/use-toast";

export default function Page() {
  const [data, setData] = useState<Recipe[]>([]);
  const { user } = useUser();

  useEffect(() => {
    fetchCook(user?.id as string).then((data) => setData(data));
  }, [data]);
  return (
    <div className="py-10 min-h-[73vh] flex flex-col gap-8">
      <div className="w-full h-[20vh] flex justify-start items-center gap-2">
        <img
          src={data[0]?.avatar}
          alt="avatar"
          className="w-[80px] h-[80px] rounded-full object-cover"
        />
        <p className="font-[600] text-xl">{data[0]?.username}</p>
      </div>
      <div className="w-full grid grid-cols-5 gap-4">
        {data?.map((i) => (
          <Dialog key={i?.id}>
            <DialogTrigger asChild className="cursor-pointer">
              <Image
                src={i.image || ""}
                alt={i.title}
                width={400}
                height={400}
                className="w-full h-[200px] object-cover rounded-lg"
              />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{i?.title}</DialogTitle>
              </DialogHeader>
              <div className="w-full flex gap-2">
                <Link href={`/recipes/${i?.id}`} className="w-1/2">
                  <Button className="w-full">View</Button>
                </Link>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-1/2"
                    onClick={() =>
                      deleteRecipe(i?.id).then((res) => {
                        toast({
                          title: res?.message,
                        });
                        revalidatePath("/profile");
                      })
                    }
                  >
                    Delete
                  </Button>
                </DialogTrigger>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
