"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { Trash } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(1),
  userId: z.string().min(1),
  description: z.string().max(300).optional(),
  image_url: z.string().min(1),
  prep_time: z.string(),
  servings: z.number().min(1),
  ingredients: z
    .array(
      z.object({
        value: z.string().min(1),
      })
    )
    .min(1),
  instructions: z
    .array(
      z.object({
        value: z.string().min(1),
      })
    )
    .min(1),
});

export default function RecipeForm({ userId }: { userId: string }) {
  const [image, setImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: userId,
      title: "",
      image_url: "",
      ingredients: [],
      instructions: [],
      prep_time: "",
      servings: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="w-full flex justify-between items-center py-5">
        <p className="text-4xl font-[600]">Create new recipe</p>
        <button
          type="submit"
          className="px-5 py-2 bg-black text-white rounded-lg cursor-pointer"
        >
          Add
        </button>
      </div>
      <div className="flex flex-col gap-5 w-1/2 mx-auto ">
        <label className="w-full flex flex-col gap-2">
          <p className="text-lg">Recipe title:</p>
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <input
                {...field}
                className="w-full px-5 py-3 border border-black rounded-lg outline-none"
              />
            )}
          />
        </label>
        {!image ? (
          <label className="w-full flex flex-col gap-2">
            <p className="text-lg">Recipe image:</p>
            <UploadDropzone
              className="h-[245px] border border-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                // Do something with the response
                setImage(res[0]?.url);
                form.setValue("image_url", res[0]?.url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </label>
        ) : (
          <div className="w-full h-[245px] relative p-4 border border-black rounded-lg">
            <button
              className="p-2 rounded-lg bg-red-500 text-white absolute top-4 right-4 cursor-pointer"
              onClick={() => setImage(null)}
            >
              <Trash size="15px" />
            </button>
            <div className="w-full h-full relative">
              <Image
                src={image}
                alt="uploaded image"
                fill
                className="h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
        <label className="w-full flex flex-col gap-2">
          <p className="text-lg">Recipe description:</p>
          <Controller
            name="description"
            control={form.control}
            render={({ field }) => (
              <textarea
                {...field}
                className="w-full px-5 py-3 border border-black rounded-lg outline-none resize-none h-[150px]"
              />
            )}
          />
        </label>
      </div>
    </form>
  );
}
