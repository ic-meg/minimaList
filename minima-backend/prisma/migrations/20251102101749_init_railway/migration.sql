/*
  Warnings:

  - The values [Low,Medium,High] on the enum `task_priority` will be removed. If these variants are still used in the database, this will fail.
  - The values [Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday,NextWeek,Later] on the enum `task_day` will be removed. If these variants are still used in the database, this will fail.
  - The values [Important,NotImportant] on the enum `task_tag` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    MODIFY `day` ENUM('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'NEXTWEEK', 'LATER') NOT NULL,
    MODIFY `tag` ENUM('IMPORTANT', 'NOTIMPORTANT') NOT NULL;
