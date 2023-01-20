/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'other',
ALTER COLUMN "name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "performers" ADD COLUMN     "naem" TEXT,
ALTER COLUMN "gender" SET DEFAULT 'other';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name";
