/*
  Warnings:

  - You are about to alter the column `citizen_id` on the `Donation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `number_of_people` on the `Housing` table. All the data in the column will be lost.
  - You are about to alter the column `citizen_id` on the `Housing` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `employee_id` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `people_assigned` to the `Housing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `people_limit` to the `Housing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Post` DROP FOREIGN KEY `Post_employee_id_fkey`;

-- AlterTable
ALTER TABLE `Donation` MODIFY `citizen_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Employee` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Housing` DROP COLUMN `number_of_people`,
    ADD COLUMN `people_assigned` INTEGER NOT NULL,
    ADD COLUMN `people_limit` INTEGER NOT NULL,
    MODIFY `citizen_id` INTEGER NULL;

-- AlterTable
ALTER TABLE `Post` MODIFY `employee_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
