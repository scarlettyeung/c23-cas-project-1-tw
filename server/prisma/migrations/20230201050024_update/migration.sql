-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_performers_id_fkey";

-- AlterTable
ALTER TABLE "event" ALTER COLUMN "performers_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_performers_id_fkey" FOREIGN KEY ("performers_id") REFERENCES "performer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
