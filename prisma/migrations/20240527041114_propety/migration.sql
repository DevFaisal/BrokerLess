/*
  Warnings:

  - Added the required column `addressId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "addressId" TEXT NOT NULL;
