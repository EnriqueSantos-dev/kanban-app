import {
	IsArray,
	IsOptional,
	IsString,
	IsUUID,
	Length,
	ValidateNested
} from 'class-validator';
import { SubTaskDto } from './create-task-input.dto';
import { Type } from 'class-transformer';

export class UpdateTaskInputDto {
	@IsOptional()
	@IsString()
	@Length(5, 50)
	title: string;

	@IsOptional()
	@IsString()
	@Length(0, 255)
	description: string;

	@IsUUID()
	columnId: string;

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => SubTaskDto)
	subTasks: SubTaskDto[] = [];
}
