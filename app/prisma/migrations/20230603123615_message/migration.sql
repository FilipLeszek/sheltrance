-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petId" INTEGER NOT NULL,
    "petName" TEXT NOT NULL,
    "candidateFirstName" TEXT NOT NULL,
    "candidateLastName" TEXT NOT NULL,
    "candidateContactInfo" TEXT NOT NULL,
    "workerId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_workerId_fkey" FOREIGN KEY ("workerId") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
