/*
  Warnings:

  - You are about to drop the column `address` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `npwp` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `inquiries` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `inquiries` table. All the data in the column will be lost.
  - You are about to drop the column `noQuotation` on the `inquiries` table. All the data in the column will be lost.
  - You are about to drop the column `requestDate` on the `inquiries` table. All the data in the column will be lost.
  - The values [QUOTATION_SENT,PO_RECEIVED,CLOSED] on the enum `inquiries_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `brand` on the `inquiry_items` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `inquiry_items` table. All the data in the column will be lost.
  - You are about to drop the column `inquiryId` on the `inquiry_items` table. All the data in the column will be lost.
  - You are about to drop the column `ppn` on the `inquiry_items` table. All the data in the column will be lost.
  - You are about to drop the column `totalHpp` on the `inquiry_items` table. All the data in the column will be lost.
  - You are about to drop the column `vendor` on the `inquiry_items` table. All the data in the column will be lost.
  - You are about to drop the `account_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `account_criterias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `account_rules` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `initial_balances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `periods` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchase_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `purchases` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sale_items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sales` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `transactions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[request_number]` on the table `inquiries` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `customer_id` to the `inquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `request_date` to the `inquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `inquiries` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inquiry_id` to the `inquiry_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `account_rules` DROP FOREIGN KEY `account_rules_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_criteriaId_fkey`;

-- DropForeignKey
ALTER TABLE `initial_balances` DROP FOREIGN KEY `initial_balances_accountId_fkey`;

-- DropForeignKey
ALTER TABLE `initial_balances` DROP FOREIGN KEY `initial_balances_periodId_fkey`;

-- DropForeignKey
ALTER TABLE `inquiries` DROP FOREIGN KEY `inquiries_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `inquiry_items` DROP FOREIGN KEY `inquiry_items_inquiryId_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_items` DROP FOREIGN KEY `purchase_items_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchase_items` DROP FOREIGN KEY `purchase_items_purchase_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchases` DROP FOREIGN KEY `purchases_supplier_id_fkey`;

-- DropForeignKey
ALTER TABLE `purchases` DROP FOREIGN KEY `purchases_transaction_id_fkey`;

-- DropForeignKey
ALTER TABLE `sale_items` DROP FOREIGN KEY `sale_items_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `sale_items` DROP FOREIGN KEY `sale_items_sale_id_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `sales` DROP FOREIGN KEY `sales_transaction_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_credit_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_debit_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_period_id_fkey`;

-- DropIndex
DROP INDEX `customers_npwp_key` ON `customers`;

-- DropIndex
DROP INDEX `inquiries_customerId_fkey` ON `inquiries`;

-- DropIndex
DROP INDEX `inquiry_items_inquiryId_fkey` ON `inquiry_items`;

-- AlterTable
ALTER TABLE `customers` DROP COLUMN `address`,
    DROP COLUMN `npwp`,
    DROP COLUMN `remarks`,
    ADD COLUMN `alamat1` VARCHAR(255) NULL,
    ADD COLUMN `alamat2` VARCHAR(255) NULL,
    ADD COLUMN `alamat3` VARCHAR(255) NULL,
    ADD COLUMN `alamat4` VARCHAR(255) NULL,
    ADD COLUMN `alamat5` VARCHAR(255) NULL,
    ADD COLUMN `alamat6` VARCHAR(255) NULL,
    ADD COLUMN `attn_inv` VARCHAR(100) NULL,
    ADD COLUMN `attn_sj` VARCHAR(100) NULL;

-- AlterTable
ALTER TABLE `inquiries` DROP COLUMN `createdAt`,
    DROP COLUMN `customerId`,
    DROP COLUMN `noQuotation`,
    DROP COLUMN `requestDate`,
    ADD COLUMN `category` ENUM('BARANG', 'PROJECT') NOT NULL DEFAULT 'BARANG',
    ADD COLUMN `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `customer_id` VARCHAR(36) NOT NULL,
    ADD COLUMN `request_date` DATE NOT NULL,
    ADD COLUMN `request_number` VARCHAR(50) NULL,
    ADD COLUMN `updated_at` DATETIME(0) NOT NULL,
    MODIFY `status` ENUM('PENDING', 'INCOMPLETE', 'READY', 'QUOTED') NOT NULL DEFAULT 'PENDING',
    MODIFY `remarks` TEXT NULL;

-- AlterTable
ALTER TABLE `inquiry_items` DROP COLUMN `brand`,
    DROP COLUMN `description`,
    DROP COLUMN `inquiryId`,
    DROP COLUMN `ppn`,
    DROP COLUMN `totalHpp`,
    DROP COLUMN `vendor`,
    ADD COLUMN `delivery_time` DATETIME(3) NULL,
    ADD COLUMN `detail` VARCHAR(100) NULL,
    ADD COLUMN `inquiry_id` VARCHAR(36) NOT NULL,
    ADD COLUMN `item_id` VARCHAR(36) NULL,
    ADD COLUMN `markup_percent` DECIMAL(5, 2) NULL,
    ADD COLUMN `notes` TEXT NULL,
    ADD COLUMN `po_price` DECIMAL(18, 2) NULL,
    ADD COLUMN `price_after_up` DECIMAL(18, 2) NULL,
    ADD COLUMN `selling_price` DECIMAL(18, 2) NULL,
    ADD COLUMN `supplier_id` VARCHAR(36) NULL,
    ADD COLUMN `total_hpp` DECIMAL(18, 2) NULL,
    ADD COLUMN `total_price` DECIMAL(18, 2) NULL,
    MODIFY `qty` INTEGER NOT NULL DEFAULT 1,
    MODIFY `hpp` DECIMAL(18, 2) NULL;

-- AlterTable
ALTER TABLE `items` ADD COLUMN `brand` VARCHAR(100) NULL,
    ADD COLUMN `code` VARCHAR(50) NOT NULL,
    ADD COLUMN `remarks` VARCHAR(255) NULL,
    ADD COLUMN `unit` VARCHAR(20) NULL,
    MODIFY `price` DECIMAL(18, 2) NULL;

-- DropTable
DROP TABLE `account_categories`;

-- DropTable
DROP TABLE `account_criterias`;

-- DropTable
DROP TABLE `account_rules`;

-- DropTable
DROP TABLE `accounts`;

-- DropTable
DROP TABLE `initial_balances`;

-- DropTable
DROP TABLE `periods`;

-- DropTable
DROP TABLE `purchase_items`;

-- DropTable
DROP TABLE `purchases`;

-- DropTable
DROP TABLE `sale_items`;

-- DropTable
DROP TABLE `sales`;

-- DropTable
DROP TABLE `transactions`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `quotations` (
    `id` VARCHAR(36) NOT NULL,
    `quotationNumber` VARCHAR(50) NOT NULL,
    `inquiryId` VARCHAR(36) NOT NULL,
    `customerId` VARCHAR(36) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'DRAFT',
    `remarks` TEXT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    UNIQUE INDEX `quotations_quotationNumber_key`(`quotationNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quotation_items` (
    `id` VARCHAR(36) NOT NULL,
    `quotationId` VARCHAR(36) NOT NULL,
    `inquiryItemId` VARCHAR(36) NULL,
    `name` VARCHAR(100) NOT NULL,
    `qty` INTEGER NOT NULL DEFAULT 1,
    `price` DECIMAL(18, 2) NULL,
    `totalPrice` DECIMAL(18, 2) NULL,
    `remarks` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `inquiries_request_number_key` ON `inquiries`(`request_number`);

-- CreateIndex
CREATE UNIQUE INDEX `items_code_key` ON `items`(`code`);

-- AddForeignKey
ALTER TABLE `inquiries` ADD CONSTRAINT `inquiries_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiry_items` ADD CONSTRAINT `inquiry_items_inquiry_id_fkey` FOREIGN KEY (`inquiry_id`) REFERENCES `inquiries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiry_items` ADD CONSTRAINT `inquiry_items_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiry_items` ADD CONSTRAINT `inquiry_items_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotations` ADD CONSTRAINT `quotations_inquiryId_fkey` FOREIGN KEY (`inquiryId`) REFERENCES `inquiries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotations` ADD CONSTRAINT `quotations_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation_items` ADD CONSTRAINT `quotation_items_quotationId_fkey` FOREIGN KEY (`quotationId`) REFERENCES `quotations`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `quotation_items` ADD CONSTRAINT `quotation_items_inquiryItemId_fkey` FOREIGN KEY (`inquiryItemId`) REFERENCES `inquiry_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
