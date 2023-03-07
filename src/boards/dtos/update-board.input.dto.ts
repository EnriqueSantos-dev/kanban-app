import { Type } from 'class-transformer';
import {
	IsArray,
	IsNotEmpty,
	IsOptional,
	IsUUID,
	ValidateNested
} from 'class-validator';

class Column {
	@IsOptional()
	@IsUUID()
	id: string;

	@IsNotEmpty()
	name: string;
}

export class UpdateBoardInputDto {
	@IsNotEmpty()
	name: string;

	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => Column)
	columns: Column[];
}
