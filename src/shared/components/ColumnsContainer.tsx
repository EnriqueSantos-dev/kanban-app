import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	MouseSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useGetTasks } from '~/hooks/useGetTasks';
import { BoardType } from '~/stores/active-board-store';
import { ActiveTaskCard } from '~/types';
import { Column } from './Column';
import { OverlayTaskCard } from './OverlayTaskCard';
import { TaskCard } from './TaskCard';

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

type ColumnsContainerProps = {
	activeBoard: BoardType;
};

export function ColumnsContainer({ activeBoard }: ColumnsContainerProps) {
	const [activeTaskCard, setActiveTaskCard] = useState<ActiveTaskCard | null>(
		null
	);
	const { data: columns } = useGetTasks(activeBoard.id);
	const columnsNameActiveBoard =
		activeBoard?.columns.map((col) => ({ id: col.id, value: col.name })) ?? [];
	const sensors = useGetSensors();

	const handleDragStart = (e: DragStartEvent) => {
		setActiveTaskCard(e.active.data.current as unknown as ActiveTaskCard);
	};

	const handleDragEnd = (e: DragEndEvent) => {
		console.log('onDragEnd', { active: e.active, over: e.over });
	};

	const handleDragOver = (_e: DragOverEvent) => {
		// console.log('onDragOver', { active: e.active, over: e.over });
	};

	return (
		<DndContext
			sensors={sensors}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onDragOver={handleDragOver}
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
							{column.tasks.map((task) => (
								<TaskCard
									key={task.id}
									{...task}
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
