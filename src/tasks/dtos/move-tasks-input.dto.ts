import { IsNotEmpty, IsString } from 'class-validator';

export class MoveTaskInputDto {
	@IsString()
	@IsNotEmpty()
	columnId: string;
}
