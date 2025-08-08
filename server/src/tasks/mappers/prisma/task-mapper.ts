import { SubTask, Task } from '@/generated/client';
import { GetTasksOutputDto } from '@/tasks/dtos';

interface TaskData extends Task {
	subtasks: SubTask[];
}

export abstract class PrismaTaskMapper {
	static toHttpTask(task: TaskData): GetTasksOutputDto {
		return {
			id: task.id,
			columnId: task.columnId,
			title: task.name,
			description: task.description,
			statusName: task.statusName,
			order: task.order,
			createdAt: task.createdAt.toISOString(),
			updatedAt: task.updatedAt.toISOString(),
			subTasks: task.subtasks.map((subTask) => ({
				id: subTask.id,
				title: subTask.name,
				isDone: subTask.isDone
			}))
		};
	}
}
