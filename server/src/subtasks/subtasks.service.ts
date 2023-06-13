import { PrismaService } from '@/database/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SubtasksService {
	constructor(private readonly prisma: PrismaService) {}

	async updateSubTaskStatus(subTaskId: string, isDone: boolean) {
		const existingSubTask = await this.prisma.subTask.findUnique({
			where: { id: subTaskId }
		});

		if (!existingSubTask) throw new NotFoundException('Subtask not found');

		const subTask = await this.prisma.subTask.update({
			where: {
				id: subTaskId
			},
			data: {
				isDone
			}
		});

		return subTask;
	}
}
