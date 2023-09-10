import { useState } from 'react';
import { createPortal } from 'react-dom';

import {
	DndContext,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	MouseSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { BoardType } from '~/stores/active-board-store';

import { useHandleDragEnd } from '~/hooks';
import { useGetTasks } from '~/hooks/useGetTasks';

import { ActiveTaskCard } from '~/types';

import { Column } from './Column';
import { OverlayTaskCard } from './OverlayTaskCard';
import { TaskCard } from './TaskCard';

type ColumnsContainerProps = {
	activeBoard: BoardType;
};

const useGetSensors = () =>
	useSensors(
		useSensor(PointerSensor, {
			activationConstraint: { distance: 8, tolerance: 100 }
		}),
		useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	);

function useDragEvents({ activeBoard }: { activeBoard: BoardType }) {
	const { handleDragEnd } = useHandleDragEnd({ activeBoard });
	const [activeTaskCard, setActiveTaskCard] = useState<ActiveTaskCard | null>(
		null
	);

	const handleDragStart = (e: DragStartEvent) =>
		setActiveTaskCard(e.active.data.current as unknown as ActiveTaskCard);
	const handleDragCancel = () => setActiveTaskCard(null);

	return { handleDragCancel, handleDragEnd, handleDragStart, activeTaskCard };
}

export function ColumnsContainer({ activeBoard }: ColumnsContainerProps) {
	const { data: columns } = useGetTasks(activeBoard.id);
	const columnsNameActiveBoard =
		activeBoard?.columns.map((col) => ({ id: col.id, value: col.name })) ?? [];
	const { handleDragCancel, handleDragEnd, handleDragStart, activeTaskCard } =
		useDragEvents({ activeBoard });
	const sensors = useGetSensors();

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragCancel={handleDragCancel}
		>
			{columns &&
				[...columns]
					.sort((a, b) => (a.order > b.order ? 1 : -1))
					.map((column) => (
						<Column
							key={column.id}
							id={column.id}
							name={column.name}
							tasks={column.tasks}
						>
							{column.tasks.map((task, i) => (
								<TaskCard
									key={task.id}
									{...task}
									index={i}
									statusOptions={columnsNameActiveBoard}
								/>
							))}
						</Column>
					))}

			{createPortal(
				<DragOverlay>
					{activeTaskCard ? <OverlayTaskCard {...activeTaskCard} /> : null}
				</DragOverlay>,
				document.getElementById('portal') as HTMLElement
			)}
		</DndContext>
	);
}
