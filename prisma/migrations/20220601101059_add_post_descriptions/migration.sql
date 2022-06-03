/*
  Warnings:

  - You are about to drop the column `text` on the `Post` table. All the data in the column will be lost.
  - Added the required column `long_description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Post` DROP COLUMN `text`,
    ADD COLUMN `long_description` LONGTEXT NOT NULL,
    ADD COLUMN `short_description` VARCHAR(191) NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL;
