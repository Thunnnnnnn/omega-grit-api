/*
  Warnings:

  - You are about to drop the column `typeId` on the `Queue` table. All the data in the column will be lost.
  - Added the required column `typeOfAnimalId` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeOfQueueId` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Queue" DROP CONSTRAINT "Queue_typeId_fkey";

-- AlterTable
ALTER TABLE "Queue" DROP COLUMN "typeId",
ADD COLUMN     "typeOfAnimalId" INTEGER NOT NULL,
ADD COLUMN     "typeOfQueueId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TypeOfAnimal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypeOfAnimal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_typeOfQueueId_fkey" FOREIGN KEY ("typeOfQueueId") REFERENCES "TypeOfQueue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_typeOfAnimalId_fkey" FOREIGN KEY ("typeOfAnimalId") REFERENCES "TypeOfAnimal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
