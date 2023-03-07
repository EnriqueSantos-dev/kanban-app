import {
	Body,
	Controller,
	Delete,
	Param,
	Patch,
	Post,
	Req,
	UseGuards
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardInputDto, UpdateBoardInputDto } from './dtos';
import { AtJwtAuthGuard } from '@/auth/guards';
import { Request } from 'express';

@Controller('boards')
@UseGuards(AtJwtAuthGuard)
export class BoardsController {
	constructor(private readonly boardsService: BoardsService) {}

	@Post()
	public async create(
		@Req() req: Request,
		@Body() dto: CreateBoardInputDto
	): Promise<void> {
		return await this.boardsService.create({ ...dto, userId: req.user.id });
	}

	@Patch(':id/update')
	public async update(
		@Param() params: { id: string },
		@Body() dto: UpdateBoardInputDto
	): Promise<void> {
		return await this.boardsService.update({ ...dto, boardId: params.id });
	}

	@Delete(':id/delete')
	public async delete(@Param() params: { id: string }): Promise<void> {
		return await this.boardsService.delete(params.id);
	}
}
