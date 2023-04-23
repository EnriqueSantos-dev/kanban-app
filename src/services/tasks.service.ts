import { api } from '~/lib';

export type CreateTaskInput = {
	title: string;
	description: string;
	columnId: string;
	subTasks?: Array<{
		title: string;
		isDone: boolean;
	}>;
};

export type CreateTaskOutPutDto = {
	id: string;
	columnId: string;
	title: string;
	statusName: string;
	order: number;
	description: string | null;
	createdAt: string;
	updatedAt: string;
	subTasks: {
		id: string;
		title: string;
		isDone: boolean;
	}[];
};

export async function createTask(
	input: CreateTaskInput
): Promise<CreateTaskOutPutDto> {
	const { data } = await api.post('tasks', input);
	return data;
}
