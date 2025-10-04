/*
  Warnings:

  - The values [LOW,MEDIUM,HIGH] on the enum `task_priority` will be removed. If these variants are still used in the database, this will fail.
  - The values [MONDAY,TUESDAY,WEDNESDAY,THURSDAY,FRIDAY,SATURDAY,SUNDAY,NEXTWEEK,LATER] on the enum `task_day` will be removed. If these variants are still used in the database, this will fail.
  - The values [IMPORTANT,NOTIMPORTANT] on the enum `task_tag` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `priority` ENUM('Low', 'Medium', 'High') NOT NULL,
    MODIFY `day` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'NextWeek', 'Later') NOT NULL,
    MODIFY `tag` ENUM('Important', 'NotImportant') NOT NULL;
