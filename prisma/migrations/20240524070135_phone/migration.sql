/*
  Warnings:

  - You are about to alter the column `phone` on the `Tenant` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Tenant" ALTER COLUMN "phone" SET DATA TYPE INTEGER;
