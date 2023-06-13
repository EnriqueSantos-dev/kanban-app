import { Module } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { SubtasksController } from './subtasks.controller';

@Module({
	providers: [SubtasksService],
	controllers: [SubtasksController]
})
export class SubtasksModule {}
