/*
  Warnings:

  - You are about to drop the column `subject_id` on the `user_like` table. All the data in the column will be lost.
  - You are about to drop the column `target_id` on the `user_like` table. All the data in the column will be lost.
  - You are about to drop the column `users_id` on the `visits` table. All the data in the column will be lost.
  - Added the required column `subject_uuid` to the `user_like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `target_uuid` to the `user_like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_uuid` to the `visits` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "visits" DROP CONSTRAINT "visits_users_id_fkey";

-- AlterTable
ALTER TABLE "user_like" DROP COLUMN "subject_id",
DROP COLUMN "target_id",
ADD COLUMN     "subject_uuid" TEXT NOT NULL,
ADD COLUMN     "target_uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "visits" DROP COLUMN "users_id",
ADD COLUMN     "user_uuid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "visits" ADD CONSTRAINT "visits_user_uuid_fkey" FOREIGN KEY ("user_uuid") REFERENCES "users"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
