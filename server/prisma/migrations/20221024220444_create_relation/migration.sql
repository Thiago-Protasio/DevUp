/*
  Warnings:

  - You are about to drop the column `education` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `jobs_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_jobs_id_fkey";

-- AlterTable
ALTER TABLE "jobs" ALTER COLUMN "open" SET DEFAULT true;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "education",
DROP COLUMN "jobs_id";

-- CreateTable
CREATE TABLE "jobs_on_users" (
    "jobs_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_on_users_pkey" PRIMARY KEY ("jobs_id","user_id")
);

-- AddForeignKey
ALTER TABLE "user_education" ADD CONSTRAINT "user_education_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs_on_users" ADD CONSTRAINT "jobs_on_users_jobs_id_fkey" FOREIGN KEY ("jobs_id") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs_on_users" ADD CONSTRAINT "jobs_on_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
