-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_propertyId_fkey`;

-- DropIndex
DROP INDEX `Image_propertyId_fkey` ON `Image`;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
