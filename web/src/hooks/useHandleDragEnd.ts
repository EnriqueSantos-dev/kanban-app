import { DragEndEvent } from '@dnd-kit/core';
import { TaskCardCurrent } from '~/shared/components/TaskCard';
import { BoardType } from '~/hooks';
import { useMoveTask } from './useMoveTask';
import { useUpdateOrder } from './useUpdateOrder';

export function useHandleDragEnd({ activeBoard }: { activeBoard: BoardType }) {
	const mutationMoveTask = useMoveTask();
	const mutationUpdateOrder = useUpdateOrder({ activeBoard });

	const handleDragEnd = (e: DragEndEvent) => {
		const activeElement = e.active;
		const overElement = e.over;

		if (activeElement.id === overElement?.id || !overElement) return;

		const activeElementData = activeElement.data.current as TaskCardCurrent;
		const overElementData = overElement.data?.current as TaskCardCurrent;

		// when the task is moved to another column and over task is undefined
		if (activeElementData.columnId !== overElement.id && !overElementData) {
			mutationMoveTask.mutate({
				taskId: activeElement.id as string,
				columnId: overElement.id as string
			});

			return;
		}

		if (activeElementData.columnId === overElementData?.columnId) {
			mutationUpdateOrder.mutate({
				taskId: activeElement.id as string,
				destinationColumnId: activeElementData.columnId,
				newOrder: overElementData?.order,
				index: overElementData.sortable.index
			});
			return;
		}

		mutationUpdateOrder.mutate({
			taskId: activeElement.id as string,
			destinationColumnId: overElementData.columnId,
			newOrder: overElementData?.order,
			index: overElementData.sortable.index
		});
	};

	return { handleDragEnd };
}
