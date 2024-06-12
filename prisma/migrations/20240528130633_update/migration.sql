/*
  Warnings:

  - The `status` column on the `Agreement` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Property` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('AVAILABLE', 'RENTED', 'MAINTENANCE', 'UNAVAILABLE');

-- CreateEnum
CREATE TYPE "AgreementStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'DECLINED', 'APPROVED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Agreement" DROP COLUMN "status",
ADD COLUMN     "status" "AgreementStatus" NOT NULL DEFAULT 'INACTIVE';

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "status",
ADD COLUMN     "status" "PropertyStatus" NOT NULL DEFAULT 'AVAILABLE';

-- DropEnum
DROP TYPE "Status";
