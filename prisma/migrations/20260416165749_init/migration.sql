/*
  Warnings:

  - Added the required column `typeId` to the `Queue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Queue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "typeId" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "TypeOfQueue" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TypeOfQueue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RunningNumber" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "typeOfQueueId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RunningNumber_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "TypeOfQueue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RunningNumber" ADD CONSTRAINT "RunningNumber_typeOfQueueId_fkey" FOREIGN KEY ("typeOfQueueId") REFERENCES "TypeOfQueue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
