/*
  Warnings:

  - You are about to drop the column `subject_uuid` on the `user_like` table. All the data in the column will be lost.
  - You are about to drop the column `target_uuid` on the `user_like` table. All the data in the column will be lost.
  - You are about to drop the column `user_uuid` on the `visits` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "visits" DROP CONSTRAINT "visits_user_uuid_fkey";

-- AlterTable
ALTER TABLE "user_like" DROP COLUMN "subject_uuid",
DROP COLUMN "target_uuid",
ADD COLUMN     "subject_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "target_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "visits" DROP COLUMN "user_uuid",
ADD COLUMN     "users_id" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
