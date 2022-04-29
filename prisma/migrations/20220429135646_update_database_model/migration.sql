/*
  Warnings:

  - You are about to drop the column `squaremeter` on the `Housing` table. All the data in the column will be lost.
  - You are about to drop the `Citizen` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[qr_code]` on the table `Refugee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Donation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Housing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_of_birth` to the `Refugee` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Donation` DROP FOREIGN KEY `Donation_citizen_id_fkey`;

-- DropForeignKey
ALTER TABLE `Housing` DROP FOREIGN KEY `Housing_citizen_id_fkey`;

-- AlterTable
ALTER TABLE `Donation` ADD COLUMN `amount` DOUBLE NOT NULL,
    MODIFY `citizen_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Employee` MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `room` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Housing` DROP COLUMN `squaremeter`,
    ADD COLUMN `size` DOUBLE NOT NULL,
    MODIFY `number_of_people` INTEGER NULL,
    MODIFY `shared_bathrooom` BOOLEAN NULL,
    MODIFY `rooms` INTEGER NULL,
    MODIFY `info` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `KitaApplication` ADD COLUMN `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Post` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `picture_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Refugee` ADD COLUMN `date_of_birth` DATE NOT NULL,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `nationality` VARCHAR(191) NULL,
    MODIFY `language` VARCHAR(191) NULL,
    MODIFY `document` LONGBLOB NULL,
    MODIFY `qr_code` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Citizen`;

-- CreateIndex
CREATE UNIQUE INDEX `Refugee_qr_code_key` ON `Refugee`(`qr_code`);
