-- CreateEnum
CREATE TYPE "Identity" AS ENUM ('performer', 'client');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('individual', 'corporate');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('completed', 'expired', 'valid');

-- CreateEnum
CREATE TYPE "Properties" AS ENUM ('public', 'private');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "identity" "Identity" NOT NULL,
    "icon" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_like" (
    "id" SERIAL NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "target_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performers" (
    "id" SERIAL NOT NULL,
    "users_id" INTEGER NOT NULL,
    "years_of_exp" INTEGER NOT NULL DEFAULT 0,
    "birthday" DATE,
    "contact_number" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "description" TEXT,
    "social_media_url" VARCHAR(255),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "performers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eprofile" (
    "id" SERIAL NOT NULL,
    "performers_id" INTEGER NOT NULL,
    "content" JSONB NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "eprofile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "introduction" TEXT,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teams_performers" (
    "id" SERIAL NOT NULL,
    "teams_id" INTEGER NOT NULL,
    "performers_id" INTEGER NOT NULL,

    CONSTRAINT "teams_performers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "contact_number" INTEGER NOT NULL,
    "description" TEXT,
    "contact_email" VARCHAR(255),
    "client_type" "ClientType" NOT NULL,
    "business_address" VARCHAR(255),
    "business_BR_no" VARCHAR(255),
    "business_website_url" VARCHAR(255),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "events_id" INTEGER NOT NULL,
    "users_id" INTEGER NOT NULL,
    "comments_content" TEXT,
    "score" DOUBLE PRECISION NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
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

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_hashtags" (
    "id" SERIAL NOT NULL,
    "events_id" INTEGER NOT NULL,
    "hashtag_details_id" INTEGER NOT NULL,

    CONSTRAINT "events_hashtags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hashtag_details" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hashtag_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "performers_hashtags" (
    "id" SERIAL NOT NULL,
    "performers_id" INTEGER NOT NULL,
    "hashtag_details_id" INTEGER NOT NULL,

    CONSTRAINT "performers_hashtags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events_applications" (
    "id" SERIAL NOT NULL,
    "events_id" INTEGER NOT NULL,
    "performers_id" INTEGER NOT NULL,
    "hashtag_details_id" INTEGER NOT NULL,
    "team_id" INTEGER NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_applications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "performers" ADD CONSTRAINT "performers_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eprofile" ADD CONSTRAINT "eprofile_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams_performers" ADD CONSTRAINT "teams_performers_teams_id_fkey" FOREIGN KEY ("teams_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams_performers" ADD CONSTRAINT "teams_performers_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_events_id_fkey" FOREIGN KEY ("events_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_hashtags" ADD CONSTRAINT "events_hashtags_events_id_fkey" FOREIGN KEY ("events_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_hashtags" ADD CONSTRAINT "events_hashtags_hashtag_details_id_fkey" FOREIGN KEY ("hashtag_details_id") REFERENCES "hashtag_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performers_hashtags" ADD CONSTRAINT "performers_hashtags_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "performers_hashtags" ADD CONSTRAINT "performers_hashtags_hashtag_details_id_fkey" FOREIGN KEY ("hashtag_details_id") REFERENCES "hashtag_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_applications" ADD CONSTRAINT "events_applications_events_id_fkey" FOREIGN KEY ("events_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_applications" ADD CONSTRAINT "events_applications_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_applications" ADD CONSTRAINT "events_applications_hashtag_details_id_fkey" FOREIGN KEY ("hashtag_details_id") REFERENCES "hashtag_details"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events_applications" ADD CONSTRAINT "events_applications_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
