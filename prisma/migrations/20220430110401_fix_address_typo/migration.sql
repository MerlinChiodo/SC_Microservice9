/*
  Warnings:

  - You are about to drop the `Addresse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Housing` DROP FOREIGN KEY `Housing_addresse_id_fkey`;

-- DropIndex
DROP INDEX `Donation_citizen_id_fkey` ON `Donation`;

-- DropIndex
DROP INDEX `Housing_citizen_id_fkey` ON `Housing`;

-- DropTable
DROP TABLE `Addresse`;

-- CreateTable
CREATE TABLE `Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `house_number` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city_code` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Housing` ADD CONSTRAINT `Housing_addresse_id_fkey` FOREIGN KEY (`addresse_id`) REFERENCES `Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
