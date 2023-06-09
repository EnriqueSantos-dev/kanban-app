import { useQuery } from '@tanstack/react-query';
import { getTasksFromBoard } from '~/services/tasks.service';

export const getTasksKey = {
	single: (id: string) => ['getTasks', id] as const
};

export function useGetTasks(boardId: string) {
	return useQuery({
		queryKey: getTasksKey.single(boardId),
		queryFn: () => getTasksFromBoard({ boardId })
	});
}
