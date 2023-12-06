import { useState } from "react";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Loader, Plus, Trash, Upload } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { sanity } from "@/db/sanity";
import { createRecipe } from "@/lib/requests";
import { getSession, useSession } from "next-auth/react";
import prisma from "@/db/prisma";
import { GetServerSidePropsContext } from "next/types";
import { redirect } from "next/navigation";

type Object = {
  id: string;
  text: string;
};

export default function Create({ id }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageAsset, setImageAsset] = useState<string | null>(null);
  const [ingredient, setIngredient] = useState("");
  const [ingredients, setIngredients] = useState<Object[]>([]);
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState<Object[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const addToArray = (array: "ing" | "ins") => {
    if (array === "ing") {
      const body: any = {
        id: uuidv4(),
        text: ingredient,
      };
      setIngredients([...ingredients].concat(body));
      setIngredient("");
    } else if (array === "ins") {
      const body: any = {
        id: uuidv4(),
        text: instruction,
      };
      setInstructions([...instructions].concat(body));
      setInstruction("");
    }
  };

  const deleteFromArray = (array: "ing" | "ins", id: string) => {
    if (array === "ing") {
      const updatedArray = ingredients.filter((item) => item?.id !== id);
      setIngredients(updatedArray);
    } else if (array === "ins") {
      const updatedArray = instructions.filter((item) => item?.id !== id);
      setInstructions(updatedArray);
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
        .catch((error) => {
          console.log("Upload failed:", error.message);
        });
    } else {
      setLoading(false);
    }
  };

  if (!session) redirect("/");
  return (
    <div className="w-full min-h-[88vh] py-10">
      <Head>
        <title>The Foodbase</title>
      </Head>
      <div className="w-full mx-auto flex flex-col gap-8">
        {/* Top */}
        <div className="w-full flex gap-8 h-[400px] md:h-[350px] flex-col md:flex-row">
          {/* Text */}
          <div className="w-full md:w-1/2 h-full flex flex-col gap-8">
            <input
              className="border border-gray-200 rounded-lg px-4 py-2"
              type="text"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <textarea
              className="px-4 py-2 w-full h-full border border-gray-200 rounded-lg resize-none"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>
          {/* Image */}
          <div className="w-full md:w-1/2 h-full border border-gray-200 rounded-lg">
            {!imageAsset && !loading ? (
              <label className="w-full h-full grid place-items-center">
                <Upload size="15px" />
                <input
                  type="file"
                  onChange={uploadImage}
                  className="absolute w-0 h-0"
                />
              </label>
            ) : loading ? (
              <div className="w-full h-full grid place-items-center">
                <Loader className="animate-spin" size="15px" />
              </div>
            ) : (
              imageAsset && (
                <div className="relative w-full h-full grid place-items-center">
                  <img
                    src={imageAsset}
                    alt="image uploaded"
                    className="h-[150px] md:h-[300px] object-contain"
                  />
                  <Button
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => setImageAsset(null)}
                  >
                    <Trash />
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
        {/* Bottom */}
        <div className="w-full flex gap-8 flex-col md:flex-row">
          {/* Ingredients */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="w-full flex gap-2">
              <input
                className="border border-gray-200 rounded-lg px-4 py-2 grow"
                type="text"
                placeholder="Ingredient"
                onChange={(e) => setIngredient(e.target.value)}
                value={ingredient}
              />
              <Button
                onClick={() => addToArray("ing")}
                disabled={ingredient.replace(/\s/g, "").length === 0}
              >
                <Plus size="15px" />
              </Button>
            </div>
            {ingredients.map((i) => (
              <div key={i.id} className="w-full flex items-center gap-4">
                <p className="grow">- {i.text}</p>
                <Button
                  variant="destructive"
                  onClick={() => deleteFromArray("ing", i.id)}
                >
                  <Trash size="15px" />
                </Button>
              </div>
            ))}
          </div>
          {/* Instructions */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="w-full flex gap-2">
              <input
                className="border border-gray-200 rounded-lg px-4 py-2 grow"
                type="text"
                placeholder="Instruction"
                onChange={(e) => setInstruction(e.target.value)}
                value={instruction}
              />
              <Button
                onClick={() => addToArray("ins")}
                disabled={instruction.replace(/\s/g, "").length === 0}
              >
                <Plus size="15px" />
              </Button>
            </div>
            {instructions.map((i, idx) => (
              <div key={i.id} className="w-full flex items-center gap-4">
                <p className="grow">
                  {idx + 1}. {i.text}
                </p>
                <Button
                  variant="destructive"
                  onClick={() => deleteFromArray("ins", i.id)}
                >
                  <Trash size="15px" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <Button
          disabled={
            title.replace(/\s/g, "").length === 0 ||
            description.replace(/\s/g, "").length === 0 ||
            !imageAsset ||
            ingredients.length === 0 ||
            instructions.length === 0
          }
          onClick={() =>
            createRecipe({
              title,
              description,
              image: imageAsset || "",
              userId: id,
              ingredients: ingredients.map((i) => i.text),
              instructions: instructions.map((i) => i.text),
              category: "breakfast",
            }).then(() => {
              setTitle("");
              setDescription("");
              setImageAsset(null);
              setIngredients([]);
              setInstructions([]);
            })
          }
        >
          Post
        </Button>
      </div>
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });

  return {
    props: {
      id: user?.id,
    },
  };
};
