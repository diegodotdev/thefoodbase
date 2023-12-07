import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db/prisma";

export async function GET(req: NextRequest, { params }: any) {
  const id = params?.id;
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wring, try again" });
  }
}
