/*
  Warnings:

  - You are about to drop the `Production` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Production";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Productions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
