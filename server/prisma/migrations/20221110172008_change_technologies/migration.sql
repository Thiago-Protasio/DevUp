/*
  Warnings:

  - You are about to drop the `technologies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "technologies" DROP CONSTRAINT "technologies_job_id_fkey";

-- AlterTable
ALTER TABLE "jobs" ADD COLUMN     "technologies" TEXT[];

-- DropTable
DROP TABLE "technologies";
