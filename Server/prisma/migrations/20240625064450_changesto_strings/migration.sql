-- DropForeignKey
ALTER TABLE "Agreement" DROP CONSTRAINT "Agreement_tenantId_fkey";

-- AlterTable
ALTER TABLE "Agreement" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Agreement" ADD CONSTRAINT "Agreement_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
