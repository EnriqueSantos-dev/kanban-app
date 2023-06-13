import { IsNumber, IsUUID, Min } from 'class-validator';

export class UpdateTasksOrderDto {
	@IsUUID('4')
	destinationColumnId: string;

	@IsNumber()
	@Min(0)
	newOrder: number;
}
