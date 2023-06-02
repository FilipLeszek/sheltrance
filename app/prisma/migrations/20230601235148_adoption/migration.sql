-- CreateTable
CREATE TABLE "Adoption" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "animalName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "shelterId" INTEGER,

    CONSTRAINT "Adoption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionStage" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dateFinished" TEXT NOT NULL,
    "isFinished" BOOLEAN NOT NULL DEFAULT false,
    "adoptionId" INTEGER NOT NULL,

    CONSTRAINT "AdoptionStage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adoption" ADD CONSTRAINT "Adoption_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionStage" ADD CONSTRAINT "AdoptionStage_adoptionId_fkey" FOREIGN KEY ("adoptionId") REFERENCES "Adoption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
