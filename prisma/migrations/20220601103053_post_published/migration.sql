/*
  Warnings:

  - You are about to drop the column `avatar_path` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Employee` DROP COLUMN `avatar_path`,
    ADD COLUMN `avatar` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `date`,
    DROP COLUMN `picture`,
    ADD COLUMN `picture_url` VARCHAR(191) NULL,
    ADD COLUMN `published` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `published_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
