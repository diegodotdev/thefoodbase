import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req.query;

  try {
    const cook = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        recipes: true,
      },
    });
    res.status(200).send(cook);
  } catch (error) {
    res.status(500).send(error);
  }
}
