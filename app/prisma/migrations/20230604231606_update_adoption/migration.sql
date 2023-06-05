-- DropForeignKey
ALTER TABLE "Adoption" DROP CONSTRAINT "Adoption_userId_fkey";

-- AlterTable
ALTER TABLE "Adoption" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
