/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "product_code_key" ON "product"("code");
