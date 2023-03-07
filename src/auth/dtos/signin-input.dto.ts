import { IsNotEmpty } from 'class-validator';

export class SignInInputDTO {
	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	password: string;
}
