/*
  Warnings:

  - A unique constraint covering the columns `[typeID]` on the table `Type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Type_typeID_key" ON "Type"("typeID");
