-- AlterTable
ALTER TABLE "Landlord" ALTER COLUMN "phone" SET DATA TYPE BIGINT;

-- CreateTable
CREATE TABLE "landlordaddress" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "landlordId" TEXT,

    CONSTRAINT "landlordaddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "landlordaddress" ADD CONSTRAINT "landlordaddress_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "Landlord"("id") ON DELETE SET NULL ON UPDATE CASCADE;
