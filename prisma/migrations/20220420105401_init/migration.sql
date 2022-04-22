-- CreateTable
CREATE TABLE `Refugee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `document` LONGBLOB NOT NULL,
    `qr_code` VARCHAR(191) NOT NULL,
    `housing_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KitaApplication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refugee_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Housing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `housing_type` VARCHAR(191) NOT NULL,
    `number_of_people` INTEGER NOT NULL,
    `squaremeter` DOUBLE NOT NULL,
    `shared_bathrooom` BOOLEAN NOT NULL,
    `rooms` INTEGER NOT NULL,
    `rent` DOUBLE NOT NULL,
    `info` LONGTEXT NOT NULL,
    `citizen_id` VARCHAR(191) NULL,
    `addresse_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Addresse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `house_number` INTEGER NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city_code` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Citizen` (
    `id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Donation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `citizen_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` VARCHAR(191) NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `room` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `text` LONGTEXT NOT NULL,
    `picture_url` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `employee_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Refugee` ADD CONSTRAINT `Refugee_housing_id_fkey` FOREIGN KEY (`housing_id`) REFERENCES `Housing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KitaApplication` ADD CONSTRAINT `KitaApplication_refugee_id_fkey` FOREIGN KEY (`refugee_id`) REFERENCES `Refugee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Housing` ADD CONSTRAINT `Housing_addresse_id_fkey` FOREIGN KEY (`addresse_id`) REFERENCES `Addresse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Housing` ADD CONSTRAINT `Housing_citizen_id_fkey` FOREIGN KEY (`citizen_id`) REFERENCES `Citizen`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Donation` ADD CONSTRAINT `Donation_citizen_id_fkey` FOREIGN KEY (`citizen_id`) REFERENCES `Citizen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_employee_id_fkey` FOREIGN KEY (`employee_id`) REFERENCES `Employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
