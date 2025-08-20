-- CreateTable
CREATE TABLE `accounts` (
    `id` VARCHAR(32) NOT NULL,
    `categoryId` VARCHAR(32) NULL,
    `criteriaId` VARCHAR(32) NULL,
    `description` TEXT NULL,
    `isContra` BOOLEAN NOT NULL,
    `position` ENUM('DEBIT', 'CREDIT') NOT NULL,
    `report` ENUM('FINANCIAL_STATEMENT', 'INCOME_STATEMENT') NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_rules` (
    `id` VARCHAR(36) NOT NULL,
    `category_id` VARCHAR(36) NOT NULL,
    `position` ENUM('DEBIT', 'CREDIT') NOT NULL,
    `report` ENUM('FINANCIAL_STATEMENT', 'INCOME_STATEMENT') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_categories` (
    `id` VARCHAR(36) NOT NULL,
    `initial_code` VARCHAR(1) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_criterias` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periods` (
    `id` VARCHAR(32) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `initial_balances` (
    `periodId` CHAR(36) NOT NULL,
    `accountId` CHAR(36) NOT NULL,
    `balance` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`periodId`, `accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` VARCHAR(36) NOT NULL,
    `period_id` VARCHAR(36) NOT NULL,
    `datetime` DATETIME(6) NOT NULL,
    `debit_account_id` VARCHAR(36) NOT NULL,
    `debit_amount` DECIMAL(18, 2) NOT NULL,
    `credit_account_id` VARCHAR(36) NOT NULL,
    `credit_amount` DECIMAL(18, 2) NOT NULL,
    `remarks` VARCHAR(255) NULL,
    `is_adjustment` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `items` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `type` ENUM('GOODS', 'SERVICE') NOT NULL,
    `price` DECIMAL(18, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `id` VARCHAR(36) NOT NULL,
    `transaction_id` VARCHAR(36) NOT NULL,
    `customer_id` VARCHAR(36) NOT NULL,
    `remarks` VARCHAR(255) NULL,
    `is_paid` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `sales_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sale_items` (
    `id` VARCHAR(36) NOT NULL,
    `sale_id` VARCHAR(36) NOT NULL,
    `item_id` VARCHAR(36) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `total_price` DECIMAL(18, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `npwp` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `remarks` VARCHAR(255) NULL,

    UNIQUE INDEX `customers_code_key`(`code`),
    UNIQUE INDEX `customers_npwp_key`(`npwp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchases` (
    `id` VARCHAR(36) NOT NULL,
    `transaction_id` VARCHAR(36) NOT NULL,
    `supplier_id` VARCHAR(36) NOT NULL,
    `remarks` VARCHAR(255) NULL,
    `is_paid` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `purchases_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `purchase_items` (
    `id` VARCHAR(36) NOT NULL,
    `purchase_id` VARCHAR(36) NOT NULL,
    `item_id` VARCHAR(36) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `total_price` DECIMAL(18, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` VARCHAR(36) NOT NULL,
    `code` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `npwp` VARCHAR(20) NULL,
    `address` VARCHAR(255) NULL,
    `remarks` VARCHAR(255) NULL,

    UNIQUE INDEX `suppliers_code_key`(`code`),
    UNIQUE INDEX `suppliers_npwp_key`(`npwp`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiries` (
    `id` VARCHAR(36) NOT NULL,
    `requestDate` DATE NOT NULL,
    `customerId` VARCHAR(36) NOT NULL,
    `status` ENUM('PENDING', 'QUOTATION_SENT', 'PO_RECEIVED', 'CLOSED') NOT NULL DEFAULT 'PENDING',
    `remarks` VARCHAR(255) NULL,
    `noQuotation` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inquiry_items` (
    `id` VARCHAR(36) NOT NULL,
    `inquiryId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `brand` VARCHAR(100) NULL,
    `status` VARCHAR(50) NULL,
    `qty` INT NOT NULL,
    `unit` VARCHAR(20) NULL,
    `hpp` DECIMAL(18, 2) NOT NULL,
    `totalHpp` DECIMAL(18, 2) NOT NULL,
    `ppn` DECIMAL(18, 2) NULL,
    `vendor` VARCHAR(100) NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

