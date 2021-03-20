/*
  Warnings:

  - You are about to drop the column `vaccineType` on the `Vaccine` table. All the data in the column will be lost.
  - Added the required column `mandatory` to the `Vaccine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vaccination" DROP CONSTRAINT "Vaccination_vaccineId_fkey";

-- AlterTable
ALTER TABLE "Vaccine" DROP COLUMN "vaccineType",
ADD COLUMN     "mandatory" BOOLEAN NOT NULL;

-- DropEnum
DROP TYPE "VaccineType";
