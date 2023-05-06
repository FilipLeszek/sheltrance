-- CreateTable
CREATE TABLE "TempEmployee" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountType" BOOLEAN NOT NULL,

    CONSTRAINT "TempEmployee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TempEmployee_email_key" ON "TempEmployee"("email");
