import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { JwtPayload } from 'jwt-decode';

export type MutationFnType<TVar = unknown, TRes = any> = UseMutationResult<
	TRes,
	ErrorApi,
	TVar,
	unknown
>;

export interface User {
	id: string;
	name: string;
	email: string;
	avatar: string | null;
}

export interface UserProfile extends User {
	boards: {
		id: string;
		name: string;
		columns: {
			id: string;
			name: string;
		}[];
	}[];
}

export interface ErrorApi
	extends AxiosError<{
		message: string;
		statusCode: number;
		error: string;
	}> {}

export type JwtPayloadType = {
	email: string;
} & JwtPayload;
