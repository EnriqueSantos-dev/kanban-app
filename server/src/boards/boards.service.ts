import { PrismaService } from '@/database/prisma.service';
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import {
	CreateBoardInputDto,
	UpdateBoardInputDto,
	UpdateBoardOutPutDto
} from './dtos';

@Injectable()
export class BoardsService {
	constructor(private readonly prisma: PrismaService) {}

	public async create(data: CreateBoardInputDto & { userId: string }) {
		const conflictingBoard = await this.prisma.board.findFirst({
			where: { name: data.name, userId: data.userId }
		});

		if (conflictingBoard) throw new ConflictException('Board already exists');

		await this.prisma.board.create({
			data: {
				name: data.name,
				userId: data.userId,
				columns: {
					createMany: {
						data: data?.initialColumns?.map((name) => ({ name })) ?? []
					}
				}
			}
		});
	}

	public async update(
		data: UpdateBoardInputDto & { boardId: string }
	): Promise<UpdateBoardOutPutDto> {
		const { name, columns, boardId } = data;

		const board = await this.prisma.board.findUnique({
			where: { id: boardId }
		});

		if (!board) throw new NotFoundException('Board not found');

		const notIn = new Set(
			columns.filter((column) => column.id).map((column) => column.id)
		);

		const boardUpdated = await this.prisma.$transaction(async (transaction) => {
			await transaction.board.update({
				where: { id: data.boardId },
				data: {
					name,
					columns: {
						deleteMany: {
							boardId: data.boardId,
							id: {
								notIn: Array.from(notIn)
							}
						}
					}
				}
			});

			await Promise.all(
				data.columns.map((column) => {
					return column.id
						? transaction.column.update({
								where: { id: column.id },
								data: { name: column.name }
						  })
						: transaction.column.create({
								data: {
									boardId: data.boardId,
									name: column.name
								}
						  });
				})
			);

			return await transaction.board.findUnique({
				where: { id: data.boardId },
				select: { name: true, columns: true }
			});
		});

		return {
			name: boardUpdated.name,
			columns: boardUpdated.columns.map((column) => ({
				id: column.id,
				name: column.name
			}))
		};
	}

	public async delete(id: string): Promise<void> {
		const board = await this.prisma.board.findUnique({ where: { id } });
		if (!board) throw new NotFoundException('Board not found');
		await this.prisma.board.delete({ where: { id } });
	}
}
