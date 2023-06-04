-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_workerId_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "workerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "AppUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
