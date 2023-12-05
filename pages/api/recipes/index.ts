import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        id: "desc",
      },
    });
    res.status(200).send(recipes);
  } catch (error) {
    res.status(500).send(error);
  }
}
