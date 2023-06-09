import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
	CreateTaskDto,
	CreateTaskOutPutDto,
	GetTasksOutputDto,
	UpdateTasksOrderDto
} from './dtos';
import { PrismaTaskMapper } from './mappers/prisma/task-mapper';

@Injectable()
export class TasksService {
	constructor(private readonly prisma: PrismaService) {}

	public async createTask(data: CreateTaskDto): Promise<CreateTaskOutPutDto> {
		const { columnId, title, description, subTasks } = data;

		await this.checkIfColumnExists(columnId);

		const countTasks = await this.prisma.task.count({
			where: { columnId }
		});

		const taskCreated = await this.prisma.task.create({
			include: {
				subtasks: true
			},
			data: {
				name: title,
				description,
				order: countTasks + 1,
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

		return PrismaTaskMapper.toHttpTask(taskCreated);
	}

	public async getTasks(boardId: string) {
		return await this.prisma.column.findMany({
			where: {
				boardId
			},
			include: {
				tasks: {
					orderBy: {
						order: 'asc'
					},
					include: {
						subtasks: true
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

	public async updateTaskOrder({
		id,
		destinationColumnId,
		newOrder
	}: UpdateTasksOrderDto & { id: string }): Promise<void> {
		const oldOrderAndOldColumnId = await this.prisma.task.findUnique({
			where: { id },
			select: {
				order: true,
				columnId: true
			}
		});

		if (!oldOrderAndOldColumnId) throw new NotFoundException('Task Not Found');

		const { columnId: oldColumnId, order: oldOrder } = oldOrderAndOldColumnId;

		if (destinationColumnId === oldColumnId && newOrder === oldOrder) return;

		// Moving task within the same column
		if (oldColumnId === destinationColumnId) {
			// Update tasks order in the same column
			await this.prisma.$transaction([
				this.prisma.task.updateMany({
					where: {
						columnId: oldColumnId,
						order: {
							gte: Math.min(oldOrder, newOrder),
							lte: Math.max(oldOrder, newOrder)
						}
					},
					data: {
						order: oldOrder < newOrder ? { decrement: 1 } : { increment: 1 }
					}
				}),
				this.prisma.task.update({
					where: { id },
					data: {
						order: newOrder
					}
				})
			]);

			return;
		}
		await this.prisma.$transaction([
			this.prisma.task.updateMany({
				where: {
					columnId: {
						in: [oldColumnId, destinationColumnId]
					},
					order: {
						gte: Math.min(oldOrder, newOrder),
						lte: Math.max(oldOrder, newOrder)
					}
				},
				data: {
					order: {
						[oldOrder > newOrder ? 'increment' : 'decrement']: 1
					}
				}
			}),
			this.prisma.task.update({
				where: { id },
				data: {
					order: newOrder,
					column: {
						connect: {
							id: destinationColumnId
						}
					}
				}
			})
		]);
	}

	public async getTasksFromColumn(
		columnId: string
	): Promise<GetTasksOutputDto[]> {
		const tasksData = await this.prisma.task.findMany({
			where: { columnId },
			include: {
				subtasks: true
			},
			orderBy: {
				order: 'asc'
			}
		});

		return tasksData.map((task) => PrismaTaskMapper.toHttpTask(task));
	}

	public async changeStatusTask(
		taskId: string,
		columnId: string
	): Promise<void> {
		const task = await this.prisma.task.findUnique({ where: { id: taskId } });

		if (!task) throw new NotFoundException('Task not found');

		const lastTaskOrder = await this.prisma.task.findMany({
			orderBy: {
				order: 'desc'
			}
		});

		const newOrderTask = lastTaskOrder ? lastTaskOrder[0].order + 1 : 1;

		await this.prisma.task.update({
			where: { id: taskId },
			data: {
				column: {
					connect: {
						id: columnId
					}
				},
				order: newOrderTask
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
