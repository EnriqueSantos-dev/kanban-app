import { AtJwtAuthGuard } from '@/auth/guards';
import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	UseGuards
} from '@nestjs/common';
import {
	CreateTaskDto,
	GetTasksOutputDto,
	MoveTaskInputDto,
	UpdateTasksOrderDto
} from './dtos';
import { UpdateTaskInputDto } from './dtos/update-task-input.dto';
import { TasksService } from './tasks.service';

@UseGuards(AtJwtAuthGuard)
@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	public async createTask(@Body() dto: CreateTaskDto) {
		return await this.tasksService.createTask(dto);
	}

	@Get(':boardId')
	public async getTasks(@Param('boardId') boardId: string): Promise<any> {
		const tasksAndColumns = await this.tasksService.getTasks(boardId);
		return tasksAndColumns;
	}

	@Put(':id')
	public async updateTask(
		@Param('id') id: string,
		@Body() dto: UpdateTaskInputDto
	): Promise<GetTasksOutputDto> {
		return await this.tasksService.updateTask({ ...dto, id });
	}

	@Patch(':id/move')
	public async moveTask(
		@Param('id') id: string,
		@Body() body: MoveTaskInputDto
	) {
		const { columnId } = body;
		return await this.tasksService.changeStatusTask(id, columnId);
	}

	@Delete(':id/delete')
	public async deleteTask(@Param('id') id: string) {
		return await this.tasksService.deleteTask(id);
	}

	@Patch(':id/update-order')
	public async updateOrderTask(
		@Param('id') id: string,
		@Body() dto: UpdateTasksOrderDto
	) {
		return await this.tasksService.updateTaskOrder({ ...dto, id });
	}
}
