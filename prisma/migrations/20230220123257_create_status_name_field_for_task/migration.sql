/*
  Warnings:

  - A unique constraint covering the columns `[name,id]` on the table `columns` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `statusName` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_columnId_fkey";

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "statusName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "columns_name_id_key" ON "columns"("name", "id");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_statusName_columnId_fkey" FOREIGN KEY ("statusName", "columnId") REFERENCES "columns"("name", "id") ON DELETE CASCADE ON UPDATE CASCADE;
