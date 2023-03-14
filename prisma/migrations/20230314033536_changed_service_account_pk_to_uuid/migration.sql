/*
  Warnings:

  - The primary key for the `ServiceAccount` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ServiceAccount" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "id" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL,
    "json" TEXT NOT NULL
);
INSERT INTO "new_ServiceAccount" ("createdAt", "deletedAt", "id", "json", "label", "updatedAt") SELECT "createdAt", "deletedAt", "id", "json", "label", "updatedAt" FROM "ServiceAccount";
DROP TABLE "ServiceAccount";
ALTER TABLE "new_ServiceAccount" RENAME TO "ServiceAccount";
CREATE UNIQUE INDEX "ServiceAccount_label_key" ON "ServiceAccount"("label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
