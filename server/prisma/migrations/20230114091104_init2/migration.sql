/*
  Warnings:

  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eprofile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events_applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `events_hashtags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hashtag_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `performers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `performers_hashtags` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teams_performers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_like` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_user_id_fkey";

-- DropForeignKey
ALTER TABLE "eprofile" DROP CONSTRAINT "eprofile_performers_id_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_clientsId_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_performers_id_fkey";

-- DropForeignKey
ALTER TABLE "events_applications" DROP CONSTRAINT "events_applications_events_id_fkey";

-- DropForeignKey
ALTER TABLE "events_applications" DROP CONSTRAINT "events_applications_hashtag_details_id_fkey";

-- DropForeignKey
ALTER TABLE "events_applications" DROP CONSTRAINT "events_applications_performers_id_fkey";

-- DropForeignKey
ALTER TABLE "events_applications" DROP CONSTRAINT "events_applications_team_id_fkey";

-- DropForeignKey
ALTER TABLE "events_hashtags" DROP CONSTRAINT "events_hashtags_events_id_fkey";

-- DropForeignKey
ALTER TABLE "events_hashtags" DROP CONSTRAINT "events_hashtags_hashtag_details_id_fkey";

-- DropForeignKey
ALTER TABLE "performers" DROP CONSTRAINT "performers_users_id_fkey";

-- DropForeignKey
ALTER TABLE "performers_hashtags" DROP CONSTRAINT "performers_hashtags_hashtag_details_id_fkey";

-- DropForeignKey
ALTER TABLE "performers_hashtags" DROP CONSTRAINT "performers_hashtags_performers_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_events_id_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_users_id_fkey";

-- DropForeignKey
ALTER TABLE "teams_performers" DROP CONSTRAINT "teams_performers_performers_id_fkey";

-- DropForeignKey
ALTER TABLE "teams_performers" DROP CONSTRAINT "teams_performers_teams_id_fkey";

-- DropTable
DROP TABLE "clients";

-- DropTable
DROP TABLE "eprofile";

-- DropTable
DROP TABLE "events";

-- DropTable
DROP TABLE "events_applications";

-- DropTable
DROP TABLE "events_hashtags";

-- DropTable
DROP TABLE "hashtag_details";

-- DropTable
DROP TABLE "performers";

-- DropTable
DROP TABLE "performers_hashtags";

-- DropTable
DROP TABLE "reviews";

-- DropTable
DROP TABLE "teams";

-- DropTable
DROP TABLE "teams_performers";

-- DropTable
DROP TABLE "user_like";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "ClientType";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Identity";

-- DropEnum
DROP TYPE "Properties";

-- DropEnum
DROP TYPE "Status";
