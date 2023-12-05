import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  try {
    await prisma.recipe.create({
      data: {
        title: body?.title,
        description: body?.description,
        image: body?.image,
        category: body?.category,
        ingredients: body?.ingredients,
        instructions: body?.instructions,
        userId: body?.userId,
      },
    });
    res.status(200).send({ message: "Recipe Posted" });
  } catch (error) {
    res.status(500).send(error);
  }
}
