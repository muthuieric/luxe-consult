/*
  Warnings:

  - You are about to alter the column `price` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,2)`.
  - You are about to alter the column `area` on the `Property` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_propertyId_fkey`;

-- DropIndex
DROP INDEX `Image_propertyId_fkey` ON `Image`;

-- AlterTable
ALTER TABLE `Property` MODIFY `price` DECIMAL(10, 2) NOT NULL,
    MODIFY `area` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_propertyId_fkey` FOREIGN KEY (`propertyId`) REFERENCES `Property`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
