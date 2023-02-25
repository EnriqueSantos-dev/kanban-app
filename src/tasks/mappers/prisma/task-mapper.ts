import { GetTasksOutputDto } from '@/tasks/dtos';
import { SubTask, Task } from '@prisma/client';

interface TaskData extends Task {
  subtasks: SubTask[];
}

export abstract class PrismaTaskMapper {
  static toHttpTask(tasks: TaskData[]): GetTasksOutputDto {
    const tasksDto = tasks.map((task) => ({
      id: task.id,
      title: task.name,
      description: task.description,
      statusName: task.statusName,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
      subTasks: task.subtasks.map((subTask) => ({
        id: subTask.id,
        title: subTask.name,
        isDone: subTask.isDone
      }))
    }));

    return { tasks: tasksDto };
  }
}
