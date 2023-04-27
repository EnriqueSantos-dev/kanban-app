import { isAxiosError } from 'axios';
import { api } from '~/lib';

export type CreateBoardInput = {
	name: string;
	initialColumns: string[];
};

export async function createBoard(input: CreateBoardInput): Promise<void> {
	try {
		await api.post('/boards', input);
	} catch (error) {
		if (isAxiosError(error)) {
			if (error.response?.status === 409) {
				throw new Error('Board already exists');
			}

			throw error;
		}
	}
}

export type EditBoardInput = {
	id: string;
	name: string;
	columns: Array<{ id?: string; name: string }>;
};

export type EditBoardOutput = {
	name: string;
	columns: Array<{ id: string; name: string }>;
};

export async function editBoard(
	input: EditBoardInput
): Promise<EditBoardOutput> {
	const { id, ...rest } = input;
	const { data } = await api.patch(`/boards/${id}/update`, rest);
	return data;
}

export type DeleteBoardInput = {
	id: string;
};

export async function deleteBoard(input: DeleteBoardInput) {
	const { id } = input;
	await api.delete(`/boards/${id}/delete`);
}
