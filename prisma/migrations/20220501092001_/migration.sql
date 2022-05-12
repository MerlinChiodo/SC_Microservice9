/*
  Warnings:

  - You are about to drop the column `addresse_id` on the `Housing` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `Housing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Housing` DROP FOREIGN KEY `Housing_addresse_id_fkey`;

-- AlterTable
ALTER TABLE `Housing` DROP COLUMN `addresse_id`,
    ADD COLUMN `address_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Housing` ADD CONSTRAINT `Housing_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
