/*
  Warnings:

  - The primary key for the `Type` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `Document` DROP FOREIGN KEY `Document_typeId_fkey`;

-- DropForeignKey
ALTER TABLE `_BehaviorToType` DROP FOREIGN KEY `_BehaviorToType_B_fkey`;

-- AlterTable
ALTER TABLE `Document` MODIFY `typeId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Type` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `_BehaviorToType` MODIFY `B` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `Type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BehaviorToType` ADD CONSTRAINT `_BehaviorToType_B_fkey` FOREIGN KEY (`B`) REFERENCES `Type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
