/*
  Warnings:

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

*/
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

-- CreateTable
CREATE TABLE "performer" (
    "id" SERIAL NOT NULL,
    "users_id" INTEGER NOT NULL,
    "naem" TEXT,
    "years_of_exp" INTEGER NOT NULL DEFAULT 0,
    "birthday" DATE,
    "contact_number" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'other',
    "description" TEXT,
    "social_media_url" VARCHAR(255),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "performer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "e_profile" (
    "id" SERIAL NOT NULL,
    "performers_id" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "e_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "team" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "introduction" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams_performer" (
    "id" SERIAL NOT NULL,
    "teams_id" INTEGER NOT NULL,
    "performers_id" INTEGER NOT NULL,

    CONSTRAINT "teams_performer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" SERIAL NOT NULL,
    "events_id" INTEGER NOT NULL,
    "users_id" INTEGER NOT NULL,
    "comments_content" TEXT,
    "score" DOUBLE PRECISION NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "performers_id" INTEGER NOT NULL,
    "clientsId" INTEGER NOT NULL,
    "wage_offer" DECIMAL(8,2) NOT NULL,
    "start_date" DATE,
    "end_date" DATE,
    "regearsal_needed" BOOLEAN NOT NULL,
    "start_time" TIME,
    "image" TEXT,
    "end_time" TIME,
    "venue_image_name" VARCHAR(255),
    "description" TEXT,
    "location" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'valid',
    "properties" "Properties" NOT NULL DEFAULT 'public',
    "is_shown" BOOLEAN NOT NULL DEFAULT true,
    "date_published" TIMESTAMP(3) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_hashtag" (
    "id" SERIAL NOT NULL,
    "events_id" INTEGER NOT NULL,
    "hashtag_details_id" INTEGER NOT NULL,

    CONSTRAINT "events_hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hashtag_detail" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hashtag_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performers_hashtag" (
    "id" SERIAL NOT NULL,
    "performers_id" INTEGER NOT NULL,
    "hashtag_details_id" INTEGER NOT NULL,

    CONSTRAINT "performers_hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_application" (
    "id" SERIAL NOT NULL,
    "events_id" INTEGER NOT NULL,
    "performers_id" INTEGER NOT NULL,
    "hashtag_details_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_application_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "performer" ADD CONSTRAINT "performer_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "e_profile" ADD CONSTRAINT "e_profile_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams_performer" ADD CONSTRAINT "teams_performer_teams_id_fkey" FOREIGN KEY ("teams_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams_performer" ADD CONSTRAINT "teams_performer_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_events_id_fkey" FOREIGN KEY ("events_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_hashtag" ADD CONSTRAINT "events_hashtag_events_id_fkey" FOREIGN KEY ("events_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_hashtag" ADD CONSTRAINT "events_hashtag_hashtag_details_id_fkey" FOREIGN KEY ("hashtag_details_id") REFERENCES "hashtag_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performers_hashtag" ADD CONSTRAINT "performers_hashtag_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performers_hashtag" ADD CONSTRAINT "performers_hashtag_hashtag_details_id_fkey" FOREIGN KEY ("hashtag_details_id") REFERENCES "hashtag_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_application" ADD CONSTRAINT "events_application_events_id_fkey" FOREIGN KEY ("events_id") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_application" ADD CONSTRAINT "events_application_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_application" ADD CONSTRAINT "events_application_hashtag_details_id_fkey" FOREIGN KEY ("hashtag_details_id") REFERENCES "hashtag_detail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_application" ADD CONSTRAINT "events_application_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
