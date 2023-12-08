"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/constants";
import { Plus, X, Loader, Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { sanity } from "@/db/sanity";
import Image from "next/image";
import { createRecipe } from "@/lib/request";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";
import { ScrollArea } from "@/components/ui/scroll-area";

type Body = {
  id: string;
  text: string;
};

export default function Page() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageAsset, setImageAsset] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<Body[]>([]);
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState<Body[]>([]);
  const { toast } = useToast();
  const { user } = useUser();

  const addToList = (id: "ing" | "ins") => {
    if (id === "ing") {
      const body = {
        id: uuidv4(),
        text: ingredient,
      };
      setIngredients([...ingredients].concat(body));
      setIngredient("");
    } else if (id === "ins") {
      const body = {
        id: uuidv4(),
        text: instruction,
      };
      setInstructions([...instructions].concat(body));
      setInstruction("");
    }
  };

  const deleteFromList = (id: string, list: "ing" | "ins") => {
    if (list === "ing") {
      const updatedList = ingredients.filter((i) => i.id !== id);
      setIngredients(updatedList);
    } else if (list === "ins") {
      const updatedList = instructions.filter((i) => i.id !== id);
      setInstructions(updatedList);
    }
  };

  const uploadImage = (e: any) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (
      selectedFile.type === "image/png" ||
      selectedFile.type === "image/svg" ||
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/gif" ||
      selectedFile.type === "image/tiff"
    ) {
      setLoading(true);
      sanity.assets
        .upload("image", selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document: any) => {
          setImageAsset(document?.url);
          setLoading(false);
        })
        .catch((error: any) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };
  return (
    <div className="w-full min-h-[73vh] py-10">
      <div className="w-full flex flex-col gap-10">
        {/* Top */}
        <div className="w-full flex flex-col md:flex-row gap-8 h-[800px] md:h-[400px]">
          {/* Inputs */}
          <div className="w-full md:w-1/2 flex flex-col gap-4 h-full">
            <Input
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            <Select onValueChange={(e) => setCategory(e)}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((i) => (
                  <SelectItem value={i.fixed} key={i.id}>
                    {i.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Description"
              className="h-[290px] resize-none"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          {/* Image */}
          <div className="w-full md:w-1/2 h-full border border-gray-200 rounded-lg">
            {!imageAsset && !loading ? (
              <label className="relative w-full h-full grid place-items-center">
                <input
                  type="file"
                  onChange={uploadImage}
                  className="w-0 h-0 absolute opacity-0"
                />
                <Upload size="15px" />
              </label>
            ) : loading ? (
              <div className="w-full h-full grid place-items-center">
                <Loader className="animate-spin" size="15px" />
              </div>
            ) : (
              imageAsset && (
                <div className="w-full h-full relative grid place-items-center">
                  <Image
                    src={imageAsset}
                    alt="uploaded image"
                    className="h-[350px] object-contain"
                    width={500}
                    height={500}
                  />
                  <Button
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => setImageAsset(null)}
                  >
                    <X size="15px" />
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
        {/* Bottom */}
        <div className="w-full flex flex-col gap-8">
          <p className="font-[600]">Ingredients</p>
          <div className="w-full flex flex-col md:flex-row gap-8">
            {/* Input */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-4">
                <Input
                  type="text"
                  placeholder="Ingredient"
                  onChange={(e) => setIngredient(e.target.value)}
                  value={ingredient}
                />
                <Button onClick={() => addToList("ing")}>
                  <Plus size="15px" />
                </Button>
              </div>
            </div>
            {/* Block */}
            <div className="w-full md:w-1/2">
              <ScrollArea className="w-full h-[300px] border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
                {ingredients.map((i) => (
                  <div
                    key={i.id}
                    className="w-full flex gap-2 items-center justify-between"
                  >
                    <p>- {i.text}</p>
                    <Button
                      variant="ghost"
                      onClick={() => deleteFromList(i.id, "ing")}
                    >
                      <X size="15px" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
          <p className="font-[600]">Instructions</p>
          <div className="w-full flex flex-col md:flex-row gap-8">
            {/* Input */}
            <div className="w-full md:w-1/2">
              <div className="flex items-center gap-4">
                <Input
                  type="text"
                  placeholder="Instruction"
                  onChange={(e) => setInstruction(e.target.value)}
                  value={instruction}
                />
                <Button onClick={() => addToList("ins")}>
                  <Plus size="15px" />
                </Button>
              </div>
            </div>
            {/* Block */}
            <div className="w-full md:w-1/2">
              <ScrollArea className="w-full h-[300px] border border-gray-200 rounded-lg p-4 flex flex-col gap-2">
                {instructions.map((i, idx) => (
                  <div
                    key={i.id}
                    className="w-full flex gap-2 items-center justify-between"
                  >
                    <p>
                      {idx + 1}. {i.text}
                    </p>
                    <Button
                      variant="ghost"
                      onClick={() => deleteFromList(i.id, "ins")}
                    >
                      <X size="15px" />
                    </Button>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </div>
        </div>
        <Button
          onClick={() =>
            createRecipe({
              title,
              description,
              category,
              ingredients: ingredients.map((i) => i.text),
              instructions: instructions.map((i) => i.text),
              image: imageAsset || "",
              userId: user?.id || "",
              username: user?.firstName || "",
              avatar: user?.imageUrl || "",
            }).then((res) => {
              toast({
                title: res?.message,
              });
              setTitle("");
              setCategory("");
              setDescription("");
              setIngredients([]);
              setInstructions([]);
              setImageAsset(null);
            })
          }
          disabled={
            (title.replace(/\s/g, "").length === 0 ||
              description.replace(/\s/g, "").length === 0 ||
              category === "",
            ingredients.length === 0 ||
              instructions.length === 0 ||
              !imageAsset)
          }
        >
          Post
        </Button>
      </div>
    </div>
  );
}
