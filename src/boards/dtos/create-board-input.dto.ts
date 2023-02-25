import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBoardInputDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  initialColumns: string[];
}
