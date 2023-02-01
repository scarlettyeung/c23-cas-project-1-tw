/*
  Warnings:

  - Added the required column `status` to the `events_application` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'accept', 'reject');

-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'accepted';

-- AlterTable
ALTER TABLE "events_application" ADD COLUMN     "status" "ApplicationStatus" NOT NULL;
