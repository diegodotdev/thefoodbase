-- CreateTable
CREATE TABLE "Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT[],
    "image" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userAvatar" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "servings" TEXT NOT NULL,
    "prepTime" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);
