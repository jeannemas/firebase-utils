/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `ServiceAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ServiceAccount_label_key" ON "ServiceAccount"("label");
