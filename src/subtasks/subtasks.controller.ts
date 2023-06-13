import { Body, Controller, Param, Patch } from '@nestjs/common';
import {
	UpdateStatusSubTaskInputDto,
	UpdateStatusSubTaskOutPutDto
} from './dtos/update-status-subtask.dto';
import { SubtasksService } from './subtasks.service';

@Controller('subtasks')
export class SubtasksController {
	constructor(private readonly subtasksService: SubtasksService) {}

	@Patch(':subTaskId/change-status')
	async changeStatus(
		@Param('subTaskId') id: string,
		@Body() updateSubTaskStatusDto: UpdateStatusSubTaskInputDto
	): Promise<UpdateStatusSubTaskOutPutDto> {
		return this.subtasksService.updateSubTaskStatus(
			id,
			updateSubTaskStatusDto.isDone
		);
	}
}
