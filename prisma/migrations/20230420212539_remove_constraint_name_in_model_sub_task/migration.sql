-- DropIndex
DROP INDEX "sub_tasks_name_key";

-- DropIndex
DROP INDEX "sub_tasks_taskId_name_idx";

-- CreateIndex
CREATE INDEX "sub_tasks_taskId_id_idx" ON "sub_tasks"("taskId", "id");
