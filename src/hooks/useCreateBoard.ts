import { useMutation } from '@tanstack/react-query';
import { CreateBoardInput, createBoard } from '~/services/boards.service';
import { ErrorApi } from '~/types';

export const useCreateBoardMutation = () =>
	useMutation<void, ErrorApi, CreateBoardInput>({
		mutationFn: (data) => createBoard(data)
	});
