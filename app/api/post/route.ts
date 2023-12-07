import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function POST(req: NextRequest, { params }: any) {
  const body = await req.json();

  try {
    await prisma.recipe.create({
      data: {
        userId: body?.userId,
        username: body?.username,
        avatar: body?.avatar,
        title: body?.title,
        description: body?.description,
        category: body?.category,
        ingredients: body?.ingredients,
        instructions: body?.instructions,
        image: body?.image,
      },
    });
    return NextResponse.json(
      { message: "Your recipe has been uploaded" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, try again" },
      { status: 500 }
    );
  }
}
