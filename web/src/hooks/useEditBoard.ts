import { useMutation } from '@tanstack/react-query';

import {
	editBoard,
	EditBoardInput,
	EditBoardOutput} from '~/services/boards.service';

import { ErrorApi } from '~/types';

export const useEditBoardMutation = () =>
	useMutation<EditBoardOutput, ErrorApi, EditBoardInput>({
		mutationFn: editBoard
	});
