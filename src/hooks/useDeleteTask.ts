import { useMutation } from '@tanstack/react-query';
import { queryClient } from '~/lib';
import { deleteTask, GetTasks } from '~/services/tasks.service';
import { useActiveBoardStore } from '~/stores/active-board-store';
import { getTasksKey } from './useGetTasks';

export const useDeleteTask = () => {
	const activeBoard = useActiveBoardStore((state) => state.activeBoard);

	return useMutation({
		mutationFn: deleteTask,
		onMutate: async (data) => {
			await queryClient.cancelQueries(getTasksKey.single(activeBoard?.id!));

			const oldColumns = queryClient.getQueryData<GetTasks[]>(
				getTasksKey.single(activeBoard?.id!)
			);

			const newColumns = oldColumns?.map((col) => {
				const oldTask = col.tasks.find((t) => t.id === data.taskId);

				if (oldTask?.columnId === col.id) {
					return {
						...col,
						tasks: col.tasks.filter((t) => t.id !== data.taskId)
					};
				}

				return col;
			});

			queryClient.setQueryData(
				getTasksKey.single(activeBoard?.id!),
				newColumns
			);
		},
		onSettled: () =>
			queryClient.invalidateQueries(getTasksKey.single(activeBoard?.id!))
	});
};
