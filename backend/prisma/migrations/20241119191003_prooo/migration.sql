-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_typeId_fkey";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "typeId" SET DEFAULT 'defaultTypeId',
ALTER COLUMN "typeId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("typeID") ON DELETE RESTRICT ON UPDATE CASCADE;
