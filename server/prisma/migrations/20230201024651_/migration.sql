/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `client` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "client_user_id_key" ON "client"("user_id");
