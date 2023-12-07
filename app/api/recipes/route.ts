import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json(recipes, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wring, try again" });
  }
}
