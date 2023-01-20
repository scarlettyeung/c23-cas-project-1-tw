/*
  Warnings:

  - You are about to drop the column `social_media_url` on the `performer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "performer" DROP COLUMN "social_media_url",
ADD COLUMN     "facebook_url" VARCHAR(255),
ADD COLUMN     "ig_media_url" VARCHAR(255),
ADD COLUMN     "twitter_url" VARCHAR(255),
ADD COLUMN     "youtube_url" VARCHAR(255);
