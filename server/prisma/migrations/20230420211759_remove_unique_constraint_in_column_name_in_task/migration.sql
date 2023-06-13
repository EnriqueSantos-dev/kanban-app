-- DropIndex
DROP INDEX "tasks_columnId_name_idx";

-- DropIndex
DROP INDEX "tasks_name_key";

-- CreateIndex
CREATE INDEX "tasks_columnId_id_idx" ON "tasks"("columnId", "id");
