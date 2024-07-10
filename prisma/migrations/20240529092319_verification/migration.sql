/*
  Warnings:

  - You are about to drop the column `verifcationToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "verifcationToken",
ADD COLUMN     "verificationToken" TEXT;
