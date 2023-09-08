import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
	createTask,
	CreateTaskInput,
	CreateTaskOutPutDto
} from '~/services/tasks.service';
import { useActiveBoard } from '~/hooks';
import { ErrorApi } from '~/types';
import { getTasksKey } from './useGetTasks';

export const useCreateNewTaskMutation = () => {
	const queryClient = useQueryClient();
	const { activeBoard } = useActiveBoard();

	return useMutation<CreateTaskOutPutDto, ErrorApi, CreateTaskInput>({
		mutationFn: createTask,
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: getTasksKey.single(activeBoard?.id!)
			});
		}
	});
};
