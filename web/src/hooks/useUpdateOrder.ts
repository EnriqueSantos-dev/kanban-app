import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
	GetTasks,
	UpdateOrderInput,
	updateOrder
} from '~/services/tasks.service';
import { BoardType } from '~/hooks';
import { ErrorApi } from '~/types';
import { getTasksKey } from './useGetTasks';
import { useNotificationToasty } from './useNotificationToasty';

export function useUpdateOrder({ activeBoard }: { activeBoard: BoardType }) {
	const queryClient = useQueryClient();
	const notification = useNotificationToasty();

	const mutation = useMutation<void, ErrorApi, UpdateOrderInput, any>({
		mutationFn: updateOrder,
		onMutate: async (variables) => {
			const tasksKey = getTasksKey.single(activeBoard.id);
			const previousTasks =
				queryClient.getQueryData<GetTasks[]>(tasksKey) ?? [];
			const previousTasksImmutable =
				queryClient.getQueryData<GetTasks[]>(tasksKey) ?? [];

			await queryClient.cancelQueries(tasksKey);

			const { taskId, destinationColumnId, index } = variables;
			const oldColumnTask = previousTasks.find((col) =>
				col.tasks.some((task) => task.id === taskId)
			);

			if (!oldColumnTask) return { previousTasks };

			const oldColumnTaskIndex = oldColumnTask.tasks.findIndex(
				(t) => t.id === taskId
			);

			if (oldColumnTaskIndex < 0) return { previousTasks };

			if (destinationColumnId === oldColumnTask.id) {
				const oldTaskData = oldColumnTask.tasks[oldColumnTaskIndex];

				oldColumnTask.tasks.splice(oldColumnTaskIndex, 1);
				oldColumnTask.tasks.splice(index, 0, oldTaskData);

				oldColumnTask.tasks = oldColumnTask.tasks.map((task, i) => ({
					...task,
					index: i
				}));

				const newPreviousTasks = previousTasks.map((col) =>
					col.id === destinationColumnId ? oldColumnTask : col
				);

				queryClient.setQueryData(tasksKey, newPreviousTasks);

				return { previousTasksImmutable, newPreviousTasks };
			}

			const oldTaskData = oldColumnTask.tasks[oldColumnTaskIndex];
			oldColumnTask.tasks.splice(oldColumnTaskIndex, 1);

			oldColumnTask.tasks = oldColumnTask.tasks.map((task, i) => ({
				...task,
				index: i
			}));

			const newColumn = previousTasks.find(
				(col) => col.id === destinationColumnId
			);

			if (!newColumn) return { previousTasks };

			newColumn.tasks.splice(index, 0, {
				...oldTaskData,
				columnId: newColumn.id,
				statusName: newColumn.name
			});

			newColumn.tasks = newColumn.tasks.map((task, i) => ({
				...task,
				index: i
			}));

			const newPreviousTasks = previousTasks.map((col) =>
				// eslint-disable-next-line no-nested-ternary
				col.id === oldColumnTask.id
					? oldColumnTask
					: col.id === newColumn.id
					? newColumn
					: col
			);

			queryClient.setQueryData(tasksKey, newPreviousTasks);

			return { previousTasksImmutable, newPreviousTasks };
		},
		// in back has error in login update order
		onSettled: () => {
			queryClient.invalidateQueries(getTasksKey.single(activeBoard.id));
		}
	});

	useEffect(() => {
		if (mutation.error) {
			notification.notification('error', mutation.error?.message as string);
		}
	}, [mutation.error]);

	return mutation;
}
