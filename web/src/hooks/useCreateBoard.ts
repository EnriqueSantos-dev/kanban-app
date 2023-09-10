import { useMutation } from '@tanstack/react-query';

import { createBoard,CreateBoardInput } from '~/services/boards.service';

import { ErrorApi } from '~/types';

export const useCreateBoardMutation = () =>
	useMutation<void, ErrorApi, CreateBoardInput>({
		mutationFn: createBoard
	});
