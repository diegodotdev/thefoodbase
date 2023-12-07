/*
  Warnings:

  - Added the required column `avatar` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
