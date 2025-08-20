  /*
    Warnings:

    - You are about to drop the column `category_id` on the `account_rules` table. All the data in the column will be lost.
    - The primary key for the `initial_balances` table will be changed. If it partially fails, the table could be left without primary key constraint.
    - Added the required column `categoryId` to the `account_rules` table without a default value. This is not possible if the table is not empty.

  */
  -- AlterTable
  ALTER TABLE `account_rules` DROP COLUMN `category_id`,
      ADD COLUMN `categoryId` VARCHAR(36) NOT NULL;

  -- AlterTable
  ALTER TABLE `initial_balances` DROP PRIMARY KEY,
      MODIFY `periodId` VARCHAR(36) NOT NULL,
      MODIFY `accountId` VARCHAR(36) NOT NULL,
      ADD PRIMARY KEY (`periodId`, `accountId`);

  -- AddForeignKey
  ALTER TABLE `accounts` ADD CONSTRAINT `accounts_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `account_categories`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `accounts` ADD CONSTRAINT `accounts_criteriaId_fkey` FOREIGN KEY (`criteriaId`) REFERENCES `account_criterias`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `account_rules` ADD CONSTRAINT `account_rules_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `account_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `initial_balances` ADD CONSTRAINT `initial_balances_periodId_fkey` FOREIGN KEY (`periodId`) REFERENCES `periods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `initial_balances` ADD CONSTRAINT `initial_balances_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `transactions` ADD CONSTRAINT `transactions_period_id_fkey` FOREIGN KEY (`period_id`) REFERENCES `periods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `transactions` ADD CONSTRAINT `transactions_debit_account_id_fkey` FOREIGN KEY (`debit_account_id`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `transactions` ADD CONSTRAINT `transactions_credit_account_id_fkey` FOREIGN KEY (`credit_account_id`) REFERENCES `accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `sales` ADD CONSTRAINT `sales_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `sales` ADD CONSTRAINT `sales_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `sale_items` ADD CONSTRAINT `sale_items_sale_id_fkey` FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `sale_items` ADD CONSTRAINT `sale_items_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `purchases` ADD CONSTRAINT `purchases_transaction_id_fkey` FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `purchases` ADD CONSTRAINT `purchases_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `purchase_items` ADD CONSTRAINT `purchase_items_purchase_id_fkey` FOREIGN KEY (`purchase_id`) REFERENCES `purchases`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

  -- AddForeignKey
  ALTER TABLE `purchase_items` ADD CONSTRAINT `purchase_items_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiries` 
ADD CONSTRAINT `inquiries_customerId_fkey` 
FOREIGN KEY (`customerId`) REFERENCES `customers`(`id`) 
ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inquiry_items` 
ADD CONSTRAINT `inquiry_items_inquiryId_fkey` 
FOREIGN KEY (`inquiryId`) REFERENCES `inquiries`(`id`) 
ON DELETE CASCADE ON UPDATE CASCADE;