import { useMutation } from '@tanstack/react-query';
import {
	CreateTaskInput,
	CreateTaskOutPutDto,
	createTask
} from '~/services/tasks.service';
import { ErrorApi } from '~/types';

export const useCreateNewTaskMutation = () =>
	useMutation<CreateTaskOutPutDto, ErrorApi, CreateTaskInput>({
		mutationFn: (data) => createTask(data)
	});
