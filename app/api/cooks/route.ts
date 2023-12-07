import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function GET() {
  try {
    const data = await prisma.recipe.findMany({
      select: {
        id: true,
        userId: true,
        username: true,
        avatar: true,
      },
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong, try again" });
  }
}
