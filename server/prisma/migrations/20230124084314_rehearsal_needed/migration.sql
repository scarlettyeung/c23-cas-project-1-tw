/*
  Warnings:

  - You are about to drop the column `regearsal_needed` on the `event` table. All the data in the column will be lost.
  - Added the required column `rehearsal_needed` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "event" DROP COLUMN "regearsal_needed",
ADD COLUMN     "rehearsal_needed" BOOLEAN NOT NULL;
