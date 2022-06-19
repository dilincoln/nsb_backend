/*
  Warnings:

  - You are about to drop the column `neighborhood` on the `addresses` table. All the data in the column will be lost.
  - Added the required column `district` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "neighborhood",
ADD COLUMN     "district" TEXT NOT NULL;
