import prisma from "@/db/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;

  try {
    await prisma.recipe?.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).send({ message: "Recipe deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
}
