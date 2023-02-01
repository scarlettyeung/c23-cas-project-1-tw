/*
  Warnings:

  - You are about to drop the column `hashtag_details_id` on the `events_application` table. All the data in the column will be lost.
  - You are about to drop the column `team_id` on the `events_application` table. All the data in the column will be lost.
  - You are about to drop the `team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams_performer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "events_application" DROP CONSTRAINT "events_application_hashtag_details_id_fkey";

-- DropForeignKey
ALTER TABLE "events_application" DROP CONSTRAINT "events_application_team_id_fkey";

-- DropForeignKey
ALTER TABLE "teams_performer" DROP CONSTRAINT "teams_performer_performers_id_fkey";

-- DropForeignKey
ALTER TABLE "teams_performer" DROP CONSTRAINT "teams_performer_teams_id_fkey";

-- AlterTable
ALTER TABLE "events_application" DROP COLUMN "hashtag_details_id",
DROP COLUMN "team_id";

-- DropTable
DROP TABLE "team";

-- DropTable
DROP TABLE "teams_performer";
