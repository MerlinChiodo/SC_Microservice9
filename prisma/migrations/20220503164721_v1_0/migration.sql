/*
  Warnings:

  - You are about to drop the column `picture_url` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `picture_url`,
    ADD COLUMN `picture` VARCHAR(191) NULL;
