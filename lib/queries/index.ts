import { RecipeProps } from "@/types";

export const addRecipe = async (body: RecipeProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/add-recipe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const result = await response.json();
  return result;
};

export const getAllRecipes = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get-recipes`,
    { cache: "no-store" }
  );
  const result = await response.json();

  return result;
};

export const getUniqueRecipe = async (id: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/get-recipes/${id}`
  );
  const result = await response.json();
  return result;
};
