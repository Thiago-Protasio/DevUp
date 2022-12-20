/*
  Warnings:

  - Changed the type of `issued_month` on the `user_certifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `issued_year` on the `user_certifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "user_certifications" DROP COLUMN "issued_month",
ADD COLUMN     "issued_month" INTEGER NOT NULL,
DROP COLUMN "issued_year",
ADD COLUMN     "issued_year" INTEGER NOT NULL;
