/*
  Warnings:

  - A unique constraint covering the columns `[events_id,performers_id]` on the table `events_application` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "events_application_events_id_performers_id_key" ON "events_application"("events_id", "performers_id");
