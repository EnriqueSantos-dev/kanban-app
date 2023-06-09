import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	createTask,
	CreateTaskInput,
	CreateTaskOutPutDto
} from '~/services/tasks.service';
import { useActiveBoardStore } from '~/stores/active-board-store';
import { ErrorApi } from '~/types';
import { getTasksKey } from './useGetTasks';

export const useCreateNewTaskMutation = () => {
	const queryClient = useQueryClient();
	const activeBoard = useActiveBoardStore((state) => state.activeBoard);

	return useMutation<CreateTaskOutPutDto, ErrorApi, CreateTaskInput>({
		mutationFn: createTask,
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: getTasksKey.single(activeBoard?.id!)
			});
		}
	});
};
