/*
  Warnings:

  - You are about to drop the column `alamat1` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `alamat2` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `alamat3` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `alamat4` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `alamat5` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `alamat6` on the `customers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `customers` DROP COLUMN `alamat1`,
    DROP COLUMN `alamat2`,
    DROP COLUMN `alamat3`,
    DROP COLUMN `alamat4`,
    DROP COLUMN `alamat5`,
    DROP COLUMN `alamat6`,
    ADD COLUMN `address1` VARCHAR(255) NULL,
    ADD COLUMN `address2` VARCHAR(255) NULL,
    ADD COLUMN `address3` VARCHAR(255) NULL,
    ADD COLUMN `address4` VARCHAR(255) NULL,
    ADD COLUMN `address5` VARCHAR(255) NULL,
    ADD COLUMN `address6` VARCHAR(255) NULL;
