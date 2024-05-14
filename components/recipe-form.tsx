"use client";

import { z } from "zod";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import { Trash, X } from "lucide-react";
import Image from "next/image";
import { addRecipe } from "@/lib/actions/recipes.actions";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

const formSchema = z.object({
  title: z.string(),
  userId: z.string(),
  description: z.string().max(300),
  image: z.string(),
  prepTime: z.string(),
  servings: z.string(),
  category: z.string(),
  ingredients: z.array(
    z.object({
      value: z.string(),
    })
  ),
  instructions: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

export default function RecipeForm() {
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      title: "",
      image: "",
      ingredients: [],
      instructions: [],
      prepTime: "",
      description: "",
      servings: "",
      category: "",
    },
  });

  const {
    fields: ings,
    append: addIng,
    remove: remIng,
  } = useFieldArray({
    control: form.control,
    name: "ingredients",
  });

  const {
    fields: ins,
    append: addIns,
    remove: remIns,
  } = useFieldArray({
    control: form.control,
    name: "instructions",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const ings = values.ingredients.map((i) => i.value);
    const ins = values.instructions.map((i) => i.value);

    const body = {
      ...values,
      userId: user?.id as string,
      userAvatar: user?.imageUrl as string,
      userName: user?.firstName as string,
      ingredients: ings,
      instructions: ins,
    };

    await addRecipe(body);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="py-5">
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
        <label className="w-full flex flex-col gap-5">
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
          <label className="w-full flex flex-col gap-5">
            <p className="text-lg">Recipe image:</p>
            <UploadDropzone
              className="h-[245px] border border-black"
              endpoint="imageUploader"
              onClientUploadComplete={(res: any) => {
                // Do something with the response
                setImage(res[0]?.url);
                form.setValue("image", res[0]?.url);
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </label>
        ) : (
          <div className="w-full flex flex-col gap-5">
            <p className="text-lg">Recipe image:</p>
            <div className="w-full h-[245px] relative p-4 border border-black rounded-lg">
              <button
                className="p-2 rounded-lg bg-red-500 text-white absolute top-4 right-4 cursor-pointer z-50"
                onClick={() => setImage(null)}
                type="button"
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
          </div>
        )}
        <label className="w-full flex flex-col gap-5">
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
        <div className="w-full gap-5 flex items-center justify-center">
          <div className="w-1/3 flex items-center gap-2">
            <Controller
              name="servings"
              control={form.control}
              render={({ field }) => (
                <input
                  type="number"
                  className="w-full px-5 py-2 rounded-lg border border-black"
                  placeholder="Servings"
                  {...field}
                />
              )}
            />
          </div>
          <div className="w-1/3 flex justify-between items-center gap-2">
            <Controller
              name="prepTime"
              control={form.control}
              render={({ field }) => (
                <input
                  {...field}
                  className="w-full px-5 py-2 rounded-lg border border-black"
                  placeholder="Prep Time"
                />
              )}
            />
          </div>
          <div className="w-1/3 flex justify-between items-center gap-2">
            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-black px-5 py-2 rounded-lg"
                >
                  <option>Category</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Supper">Supper</option>
                  <option value="Snack">Snack</option>
                  <option value="Drink">Drink</option>
                  <option value="Brunch">Brunch</option>
                  <option value="Dessert">Dessert</option>
                </select>
              )}
            />
          </div>
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex justify-between items-center sticky top-0 bg-white">
            <p className="text-lg">Recipe ingredients:</p>
            <button
              className="px-5 py-2 bg-black text-white rounded-lg"
              onClick={() => addIng({ value: "" })}
              type="button"
            >
              Add
            </button>
          </div>
          {ings.map((field, index) => (
            <Controller
              name={`ingredients.${index}.value`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <div className="flex items-center gap-5 w-full">
                  <input
                    {...field}
                    className="w-full px-5 py-3 border border-black rounded-lg outline-none"
                  />
                  <button
                    className="text-white bg-red-500 rounded-lg p-4"
                    onClick={() => remIng(index)}
                    type="button"
                  >
                    <X size="15px" />
                  </button>
                </div>
              )}
            />
          ))}
        </div>
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex justify-between items-center sticky top-0 bg-white">
            <p className="text-lg">Recipe instructions:</p>
            <button
              className="px-5 py-2 bg-black text-white rounded-lg"
              onClick={() => addIns({ value: "" })}
              type="button"
            >
              Add
            </button>
          </div>
          {ins.map((field, index) => (
            <Controller
              name={`instructions.${index}.value`}
              control={form.control}
              key={field.id}
              render={({ field }) => (
                <div className="flex items-center gap-5 w-full">
                  <input
                    {...field}
                    className="w-full px-5 py-3 border border-black rounded-lg outline-none"
                  />
                  <button
                    className="text-white bg-red-500 rounded-lg p-4"
                    onClick={() => remIns(index)}
                    type="button"
                  >
                    <X size="15px" />
                  </button>
                </div>
              )}
            />
          ))}
        </div>
      </div>
    </form>
  );
}
