/*
  Warnings:

  - You are about to drop the `clients` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_user_id_fkey";

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_clientsId_fkey";

-- DropTable
DROP TABLE "clients";

-- CreateTable
CREATE TABLE "client" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" VARCHAR(255),
    "gender" "Gender" NOT NULL DEFAULT 'other',
    "contact_number" INTEGER NOT NULL,
    "description" TEXT,
    "contact_email" VARCHAR(255),
    "client_type" "ClientType" NOT NULL,
    "business_address" VARCHAR(255),
    "business_BR_no" VARCHAR(255),
    "business_website_url" VARCHAR(255),
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "client" ADD CONSTRAINT "client_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_clientsId_fkey" FOREIGN KEY ("clientsId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
