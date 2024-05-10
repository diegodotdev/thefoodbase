"use server";

import { RecipeProps } from "@/types";
import prisma from "../db/prisma";

export const createRecipe = async (body: RecipeProps) => {
  if (!body?.userId)
    throw new Error("Unauthorazied request, userId is missing");

  try {
    await prisma.recipe.create({
      data: {
        ...body,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export const fetchAllRecipes = async () => {
  try {
    const data = await prisma.recipe.findMany({
      orderBy: {
        created_at: "desc",
      },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const fetchUniqueRecipe = async (id: string) => {
  const data = await prisma.recipe.findUnique({
    where: {
      id: id,
    },
  });
  return data;
};
