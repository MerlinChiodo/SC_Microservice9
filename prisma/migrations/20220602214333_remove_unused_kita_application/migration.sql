/*
  Warnings:

  - You are about to drop the `KitaApplication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `KitaApplication` DROP FOREIGN KEY `KitaApplication_refugee_id_fkey`;

-- DropTable
DROP TABLE `KitaApplication`;
