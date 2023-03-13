-- CreateTable
CREATE TABLE "ServiceAccount" (
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "json" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceAccount_id_key" ON "ServiceAccount"("id");
