import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DialogDescription, DialogTrigger } from '@radix-ui/react-dialog';
import * as Popover from '@radix-ui/react-popover';
import { useCallback, useMemo, useState } from 'react';
import { useChangeStatusSubTask } from '~/hooks/useChangeStatusSubTask';
import { useMoveTask } from '~/hooks/useMoveTask';
import { Task } from '~/types';
import { cn } from '~/utils';
import { DeleteTaskForm } from './DeleteTaskForm';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogPortal
} from './Dialog';
import { Label } from './Label';
import { Option, SelectStatusTask } from './SelectStatusTask';
import { ToggleSubTaskCard } from './ToggleSubTaskCard';

export type TaskCardCurrent = {
	completedSubtasksCount: number;
	totalSubtasksCount: number;
	sortable: {
		containerId: string;
		index: number;
		items: string[];
	};
} & Task;

type TaskCardProps = Task & {
	index: number;
	statusOptions: Option[];
};

function getIfTaskIsDone(subtasks: string[], taskId: string) {
	return subtasks.includes(taskId);
}

export function TaskCard({
	id,
	order,
	columnId,
	subtasks,
	name,
	description,
	statusOptions,
	index,
	...props
}: TaskCardProps) {
	const [isOpenModalEditTask, setIsOpenModalEditTask] = useState(false);
	const [isOpenModalDeleteTask, setIsOpenModalDeleteTask] = useState(false);
	const mutationChangeStatusSubTask = useChangeStatusSubTask();
	const mutationMoveTask = useMoveTask();
	const [checkedSubtasks, setCheckedSubtask] = useState<string[]>(() =>
		subtasks?.filter((sub) => sub.isDone).map((sub) => sub.id)
	);
	const completedSubtasksCount = useMemo(
		() => checkedSubtasks.length ?? 0,
		[checkedSubtasks]
	);
	const [defaultStatus] = statusOptions.filter((s) => s.id === columnId);
	const { active, transition, transform, setNodeRef, attributes, listeners } =
		useSortable({
			id,
			transition: {
				duration: 150,
				easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
			},
			data: {
				id,
				name,
				description,
				columnId,
				order,
				statusOptions,
				subtasks,
				index,
				...props,
				completedSubtasksCount,
				totalSubtasksCount: subtasks?.length ?? 0
			}
		});

	const handleChangeModalDelete = useCallback(() => {
		setIsOpenModalDeleteTask((prev) => !prev);
		setIsOpenModalEditTask(false);
	}, [id]);

	const handleMoveTask = useCallback((colId: string) => {
		mutationMoveTask.mutate({
			taskId: id,
			columnId: colId
		});
	}, []);

	const handleChangeCheckedSubtask = useCallback(
		(taskId: string) => {
			setCheckedSubtask((prev) => {
				const newCheckedSubtask = prev.includes(taskId)
					? prev.filter((t) => t !== taskId)
					: [...prev, taskId];
				return newCheckedSubtask;
			});
		},
		[id]
	);

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: active ? 0.5 : 1
	};

	return (
		<>
			<Dialog
				open={isOpenModalEditTask}
				onOpenChange={() => setIsOpenModalEditTask((prev) => !prev)}
			>
				<DialogTrigger
					aria-label="draggable task"
					ref={setNodeRef}
					className="dark:bg-darkGrey shadow-taskCard focus:ring-purple dark:focus:ring-offset-veryDarkGrey focus:ring-offset-lightGrey relative flex h-[90px] cursor-grab touch-manipulation flex-col rounded-lg bg-white px-4 py-6 outline-none transition duration-200 ease-in-out focus:ring-1 focus:ring-offset-1"
					style={style}
					{...attributes}
					{...listeners}
				>
					<p className="max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-base/6 font-bold text-black dark:text-white">
						{name}
					</p>

					{subtasks?.length > 0 && (
						<span className="text-mediumGrey text-xs font-bold">
							{`${completedSubtasksCount} of  ${subtasks.length}`}
						</span>
					)}
				</DialogTrigger>

				<DialogPortal>
					<DialogOverlay />
					<DialogContent>
						<div className="flex items-center justify-between">
							<DialogHeader className="mb-0 text-xl">{name}</DialogHeader>
							<Popover.Root>
								<Popover.Trigger asChild>
									<button
										type="button"
										aria-label="Edit or delete task"
										className="group flex h-5 items-center justify-center px-3 outline-none"
									>
										<svg
											width="5"
											height="20"
											xmlns="http://www.w3.org/2000/svg"
											className="group-focus:fill-purple fill-mediumGrey hover:fill-purple dark:hover:fill-purpleHover cursor-pointer"
										>
											<g fillRule="evenodd">
												<circle cx="2.308" cy="2.308" r="2.308" />
												<circle cx="2.308" cy="10" r="2.308" />
												<circle cx="2.308" cy="17.692" r="2.308" />
											</g>
										</svg>
									</button>
								</Popover.Trigger>
								<Popover.Content
									className={cn(
										'absolute transition-all top-10 rounded-md bg-white p-4 right-0 w-44 shadow-md dark:bg-darkGrey data-[state=open]:animate-fade-in data-[state=open]:animate-scale-up group-data-[state=closed]:animate-fade-out z-50'
									)}
								>
									<div className="flex flex-col items-start gap-4">
										<button
											type="button"
											className="text-mediumGrey dark:hover:text-lightGrey dark:focus:text-lightGrey cursor-pointer whitespace-nowrap text-sm font-medium capitalize outline-none transition-colors hover:text-black focus:text-black"
										>
											Edit task
										</button>

										<button
											type="button"
											className="text-red dark:hover:text-redHover dark:focus:text-redHover cursor-pointer whitespace-nowrap text-sm font-medium capitalize outline-none transition-colors hover:text-[#BC2727] focus:text-[#BC2727]"
											onClick={handleChangeModalDelete}
										>
											Delete Task
										</button>
									</div>
								</Popover.Content>
							</Popover.Root>
						</div>

						{description && (
							<DialogDescription className="text-mediumGrey mt-8 line-clamp-3 font-medium">
								{description}
							</DialogDescription>
						)}

						<div className="mt-5 space-y-3">
							<p className="text-mediumGrey font-bold dark:text-white">
								SubTasks&nbsp;
								{subtasks.length > 0
									? `(${completedSubtasksCount} of ${subtasks.length})`
									: null}
							</p>

							{subtasks?.length === 0 && (
								<p className="text-mediumGrey text-sm font-medium">
									No subtasks yet
								</p>
							)}
							<ul className="flex flex-col gap-3">
								{subtasks?.map((subtask) => (
									<ToggleSubTaskCard
										key={subtask.id}
										{...subtask}
										isChecked={getIfTaskIsDone(checkedSubtasks, subtask.id)}
										onChangeStatus={({ subTaskId, isDone }) => {
											handleChangeCheckedSubtask(subTaskId);
											mutationChangeStatusSubTask.mutate({
												isDone,
												subTaskId
											});
										}}
									/>
								))}
							</ul>
						</div>

						<Label label="Status" className="mt-4 text-base">
							<SelectStatusTask
								options={statusOptions}
								defaultOption={defaultStatus}
								onValueChange={handleMoveTask}
							/>
						</Label>
					</DialogContent>
				</DialogPortal>
			</Dialog>

			<DeleteTaskForm
				id={id}
				isOpenModal={isOpenModalDeleteTask}
				onChangeModalState={handleChangeModalDelete}
			/>
		</>
	);
}
