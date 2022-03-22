/*
  Warnings:

  - You are about to drop the column `ownerId` on the `AnnualWork` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `AnnualWork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patrolId` to the `AnnualWork` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'TEACHER');

-- DropForeignKey
ALTER TABLE "AnnualWork" DROP CONSTRAINT "AnnualWork_ownerId_fkey";

-- AlterTable
ALTER TABLE "AnnualWork" DROP COLUMN "ownerId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "keywords" TEXT[],
ADD COLUMN     "patrolId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT E'STUDENT',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "AnnualWork" ADD CONSTRAINT "AnnualWork_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualWork" ADD CONSTRAINT "AnnualWork_patrolId_fkey" FOREIGN KEY ("patrolId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
