import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SingUpInputDTO {
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	@Length(6, 20)
	password: string;

	@IsNotEmpty()
	@Length(3, 50)
	name: string;
}
