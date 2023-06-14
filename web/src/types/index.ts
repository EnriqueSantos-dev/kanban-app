import { UseMutationResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { JwtPayload } from 'jwt-decode';

export type MutationFnType<TVar = unknown, TRes = any> = UseMutationResult<
	TRes,
	ErrorApi,
	TVar,
	unknown
>;

export type Theme = 'light' | 'dark';

export interface User {
	id: string;
	name: string;
	email: string;
	avatarUrl: string | null;
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

export type Column = {
	id: string;
	name: string;
	order: number;
	createdAt: string;
	updatedAt: string;
	boardId: string;
};

export type Task = {
	id: string;
	index: number;
	columnId: string;
	name: string;
	statusName: string;
	order: number;
	description: string | null;
	createdAt: string;
	updatedAt: string;
	subtasks: SubTask[];
};

export type SubTask = {
	id: string;
	name: string;
	isDone: boolean;
};

export type ActiveTaskCard = {
	id: string;
	name: string;
	completedSubtasksCount: number;
	totalSubtasksCount: number;
};
