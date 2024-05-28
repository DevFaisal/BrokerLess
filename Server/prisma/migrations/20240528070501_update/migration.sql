/*
  Warnings:

  - You are about to drop the column `tenantId` on the `UserAddress` table. All the data in the column will be lost.
  - You are about to drop the `landlordaddress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserAddress" DROP CONSTRAINT "UserAddress_tenantId_fkey";

-- DropForeignKey
ALTER TABLE "landlordaddress" DROP CONSTRAINT "landlordaddress_landlordId_fkey";

-- AlterTable
ALTER TABLE "UserAddress" DROP COLUMN "tenantId",
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "landlordaddress";

-- CreateTable
CREATE TABLE "Landlordaddress" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "landlordId" TEXT,

    CONSTRAINT "Landlordaddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAddress" ADD CONSTRAINT "UserAddress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Landlordaddress" ADD CONSTRAINT "Landlordaddress_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "Landlord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
