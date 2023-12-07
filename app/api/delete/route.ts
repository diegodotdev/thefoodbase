import prisma from "@/db/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: any) {
  const body = await req.json();

  try {
    await prisma.recipe.delete({
      where: {
        id: parseInt(body),
      },
    });
    return NextResponse.json(
      { message: "Recipe has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong, try again" },
      { status: 500 }
    );
  }
}
