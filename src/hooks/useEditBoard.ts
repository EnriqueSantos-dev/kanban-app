import { useMutation } from '@tanstack/react-query';
import {
	EditBoardInput,
	EditBoardOutput,
	editBoard
} from '~/services/boards.service';
import { ErrorApi } from '~/types';

export const useEditBoardMutation = () =>
	useMutation<EditBoardOutput, ErrorApi, EditBoardInput>({
		mutationFn: (data) => editBoard(data)
	});
