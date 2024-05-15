"use server";

import type { RecipeProps } from "@/types";
import prisma from "../db/prisma";

export const addRecipe = async (body: RecipeProps) => {
  await prisma.recipe.create({
    data: {
      ...body,
    },
  });
};

export const getAllRecipes = async () => {
  const data = await prisma.recipe.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
};

export const getUniqueRecipe = async (id: string) => {
  const data = await prisma.recipe.findUnique({
    where: {
      id: id,
    },
  });

  return data;
};

export const getRecipesByCategory = async (id: string) => {
  const data = await prisma.recipe.findMany({
    where: {
      category: id,
    },
  });

  return data;
};

export const getRecentRecipes = async () => {
  const data = await prisma.recipe.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      image: true,
      id: true,
      title: true,
    },
  });

  return data;
};
