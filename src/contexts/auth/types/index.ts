export interface AuthSignInRequest {
	email: string;
	password: string;
}

export interface AuthSignUpRequest {
	name: string;
	email: string;
	password: string;
	avatar?: File;
}
