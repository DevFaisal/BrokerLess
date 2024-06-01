-- DropForeignKey
ALTER TABLE "Landlordaddress" DROP CONSTRAINT "Landlordaddress_landlordId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_landlordId_fkey";

-- AddForeignKey
ALTER TABLE "Landlordaddress" ADD CONSTRAINT "Landlordaddress_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "Landlord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "Landlord"("id") ON DELETE CASCADE ON UPDATE CASCADE;
