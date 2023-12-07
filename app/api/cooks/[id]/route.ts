import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db/prisma";

export async function GET(req: NextRequest, { params }: any) {
  const id = params?.id;

  try {
    const data = await prisma.recipe.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong, try again" });
  }
}
