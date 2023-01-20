/*
  Warnings:

  - You are about to drop the column `clientsId` on the `event` table. All the data in the column will be lost.
  - Added the required column `clients_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_clientsId_fkey";

-- AlterTable
ALTER TABLE "event" DROP COLUMN "clientsId",
ADD COLUMN     "clients_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_clients_id_fkey" FOREIGN KEY ("clients_id") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
