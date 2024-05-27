/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Agreement` table. All the data in the column will be lost.
  - Added the required column `rent` to the `Agreement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agreement" DROP COLUMN "updatedAt",
ADD COLUMN     "rent" INTEGER NOT NULL;
