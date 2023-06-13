import { IsNotEmpty } from 'class-validator';

export class UpdateStatusSubTaskInputDto {
	@IsNotEmpty()
	isDone: boolean;
}

export interface UpdateStatusSubTaskOutPutDto {
	id: string;
	isDone: boolean;
	name: string;
}
