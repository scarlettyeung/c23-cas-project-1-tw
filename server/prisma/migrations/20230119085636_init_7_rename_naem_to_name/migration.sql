/*
  Warnings:

  - You are about to drop the column `naem` on the `performer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "performer" DROP COLUMN "naem",
ADD COLUMN     "name" TEXT;
