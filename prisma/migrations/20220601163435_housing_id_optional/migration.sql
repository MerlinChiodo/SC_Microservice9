-- DropForeignKey
ALTER TABLE `Refugee` DROP FOREIGN KEY `Refugee_housing_id_fkey`;

-- AlterTable
ALTER TABLE `Refugee` MODIFY `housing_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Refugee` ADD CONSTRAINT `Refugee_housing_id_fkey` FOREIGN KEY (`housing_id`) REFERENCES `Housing`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
