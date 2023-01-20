/*
  Warnings:

  - You are about to drop the column `ig_media_url` on the `performer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "performer" DROP COLUMN "ig_media_url",
ADD COLUMN     "ig_url" VARCHAR(255);
