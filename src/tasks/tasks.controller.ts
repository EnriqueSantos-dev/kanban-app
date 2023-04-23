import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { AtJwtAuthGuard } from '@/auth/guards';
import {
	CreateTaskDto,
	GetTasksOutputDto,
	MoveTaskInputDto,
	UpdateTasksOrderDto
} from './dtos';

@UseGuards(AtJwtAuthGuard)
@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	public async createTask(@Body() dto: CreateTaskDto) {
		return await this.tasksService.createTask(dto);
	}

	@Get(':columnId')
	public async getTasksFromColumn(
		@Param('columnId') columnId: string
	): Promise<{ tasks: GetTasksOutputDto[] }> {
		const tasks = await this.tasksService.getTasksFromColumn(columnId);
		return { tasks };
	}

	@Patch(':id/update')
	public async updateTask(
		@Param('id') id: string,
		@Body() dto: Partial<CreateTaskDto>
	) {
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
