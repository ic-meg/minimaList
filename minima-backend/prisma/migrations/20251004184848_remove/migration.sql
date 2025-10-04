/*
  Warnings:

  - You are about to drop the column `userId` on the `task` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `task_userId_fkey`;

-- DropIndex
DROP INDEX `task_userId_fkey` ON `task`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `user`;
