/*
  Warnings:

  - Added the required column `tag_type` to the `hashtag_detail` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('event', 'performer');

-- AlterTable
ALTER TABLE "hashtag_detail" ADD COLUMN     "tag_type" "TagType" NOT NULL;
