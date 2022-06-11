/*
  Warnings:

  - You are about to drop the column `shared_bathrooom` on the `Housing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Housing` DROP COLUMN `shared_bathrooom`,
    ADD COLUMN `shared_bathroom` BOOLEAN NULL;
