import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, GetTasksOutputDto } from './dtos';
import { PrismaTaskMapper } from './mappers/prisma/task-mapper';

@Injectable()
export class TasksService {
	constructor(private readonly prisma: PrismaService) {}

	public async createTask(data: CreateTaskDto): Promise<void> {
		const { columnId, title, description, subTasks } = data;

		await this.checkIfColumnExists(columnId);

		await this.prisma.task.create({
			data: {
				name: title,
				description,
				subtasks: {
					createMany: {
						data: subTasks.map((subTask) => ({
							name: subTask.title
						}))
					}
				},
				column: {
					connect: {
						id: columnId
					}
				}
			}
		});
	}

	public async updateTask(
		data: Partial<CreateTaskDto> & { id: string }
	): Promise<void> {
		const { id, columnId, title, description, subTasks } = data;

		await this.checkIfColumnExists(columnId);

		const notIn = new Set<string>(
			subTasks.filter((subTask) => subTask.id).map((subTask) => subTask.id)
		);

		await this.prisma.$transaction(async (transaction) => {
			await this.prisma.task.update({
				where: { id },
				data: {
					name: title,
					description,
					column: {
						connect: {
							id: columnId
						}
					},
					subtasks: {
						deleteMany: {
							taskId: id,
							id: {
								notIn: Array.from(notIn)
							}
						}
					}
				}
			});

			await Promise.all(
				subTasks.map((subTask) => {
					return subTask.id
						? transaction.subTask.update({
								where: { id: subTask.id },
								data: { name: subTask.title }
						  })
						: transaction.subTask.create({
								data: {
									name: subTask.title,
									taskId: id
								}
						  });
				})
			);
		});
	}

	public async deleteTask(id: string): Promise<void> {
		const task = await this.prisma.task.findUnique({ where: { id } });
		if (!task) throw new NotFoundException('Task not found');

		await this.prisma.task.delete({
			where: { id }
		});
	}

	public async getTasksFromColumn(
		columnId: string
	): Promise<GetTasksOutputDto> {
		const tasksData = await this.prisma.task.findMany({
			where: { columnId },
			include: {
				subtasks: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		});

		return PrismaTaskMapper.toHttpTask(tasksData);
	}

	public async changeStatusTask(
		taskId: string,
		columnId: string
	): Promise<void> {
		const task = await this.prisma.task.findUnique({ where: { id: taskId } });
		if (!task) throw new NotFoundException('Task not found');

		await this.prisma.task.update({
			where: { id: taskId },
			data: {
				columnId
			}
		});
	}

	private async checkIfColumnExists(columnId: string) {
		// check if column exists
		const column = await this.prisma.column.findUnique({
			where: { id: columnId }
		});

		if (!column) throw new NotFoundException('Column not found');
	}
}
