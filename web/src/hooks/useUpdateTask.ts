import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BoardType } from '~/stores/active-board-store';

import { GetTasks, updateTask } from '~/services/tasks.service';

import { queryClient } from '~/lib';

import { getTasksKey } from './useGetTasks';

export function useUpdateTask({ activeBoard }: { activeBoard: BoardType }) {
	const queryCLient = useQueryClient();

	return useMutation({
		mutationFn: updateTask,
		onMutate: async (vars) => {
			const { id, columnId, description, subTasks, title } = vars;

			// cancel any outgoing refetches (so they don't overwrite our optimistic update)
			await queryClient.cancelQueries(getTasksKey.single(activeBoard.id));

			// snapshot the previous value
			const snapShotTasks = queryClient.getQueryData(
				getTasksKey.single(activeBoard.id)
			);

			// optimistically update to the new value
			if (snapShotTasks) {
				queryClient.setQueryData<GetTasks[]>(
					getTasksKey.single(activeBoard.id),
					(cols) =>
						cols?.map((col) => {
							if (col.id === columnId) {
								return {
									...col,
									tasks: col.tasks.map((task) =>
										task.id === id
											? {
													...task,
													title,
													description: description ?? null,
													subTasks,
													columnId,
													statusName: col.name
											  }
											: task
									)
								};
							}

							return col;
						})
				);
			}

			return { snapShotTasks };
		},
		onSettled: () => {
			queryCLient.invalidateQueries(getTasksKey.single(activeBoard.id));
		}
	});
}
