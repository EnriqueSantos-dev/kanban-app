import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import {
	useEditBoardMutation,
	useInteractiveForm,
	useNotificationToasty
} from '~/hooks';
import { getTasksKey } from '~/hooks/useGetTasks';
import {
	Button,
	ButtonRemoveItemFormFormFieldArray,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTrigger,
	Label,
	TextField
} from '~/shared/components';
import { BoardType } from '~/stores/active-board-store';
import { cn } from '~/utils/cn';
import { userKeys } from '~/utils/query-keys-factories';
import { EditBoardFormValues, schema } from './schema';

type ColumnForm = Pick<z.infer<typeof schema>, 'columns'>['columns'];
type Column = Array<{
	id: string;
	name: string;
}>;

type FormEditBoardProps = {
	board: BoardType;
	setUpdatedBoard: (board: BoardType) => void;
	isCreateNewColumn?: boolean;
};

const mapperOldAndNewColumns = (
	newArray: ColumnForm,
	prevArray: Column,
	isOld: boolean = false
) =>
	newArray
		.filter((col) => {
			const column = prevArray.find((prevCol) => prevCol.id === col.id);
			return isOld ? column?.id === col.id : column?.id !== col.id;
		})
		.map((col) =>
			isOld ? { id: col.id, name: col.value } : { name: col.value }
		);

export function FormEditBoard({
	board,
	setUpdatedBoard,
	isCreateNewColumn = false
}: FormEditBoardProps) {
	const queryClient = useQueryClient();
	const [isOpen, setIsOpen] = useState(false);
	const { notificationLoading } = useNotificationToasty();
	const mutation = useEditBoardMutation();
	const {
		register,
		handleSubmit,
		handleInsertField,
		handleRemoveField,
		handleResetForm,
		fields,
		formState: { errors }
	} = useInteractiveForm({
		schema,
		interactiveFieldName: 'columns',
		defaultValues: {
			name: board.name,
			columns:
				board.columns.map((column) => ({
					id: column.id,
					value: column.name.trim()
				})) ?? []
		}
	});

	const onModalChange = () => {
		setIsOpen((prev) => !prev);
		handleResetForm();
	};

	const onSubmit: SubmitHandler<EditBoardFormValues> = (data) => {
		const { name, columns } = data;
		const { columns: oldColumns } = board;

		const newColumns = mapperOldAndNewColumns(columns, oldColumns);
		const oldColumnsUpdated = mapperOldAndNewColumns(columns, oldColumns, true);

		notificationLoading(
			mutation.mutateAsync({
				id: board.id,
				name,
				columns: [...newColumns, ...oldColumnsUpdated]
			}),
			{
				loading: 'Updating board...',
				success: 'Board updated successfully',
				error: (e) => e.message
			}
		);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			queryClient.invalidateQueries({
				queryKey: userKeys.profile
			});
			queryClient.invalidateQueries({ queryKey: getTasksKey.single(board.id) });
			setUpdatedBoard({ id: board.id, ...mutation.data });
			setIsOpen(false);
			handleResetForm();
		}
	}, [mutation.isSuccess]);

	useEffect(() => {
		if (isCreateNewColumn) {
			handleInsertField(
				{ id: crypto.randomUUID(), value: '' },
				{
					shouldFocus: true
				}
			);
		}
	}, [isOpen]);

	return (
		<Dialog onOpenChange={onModalChange} open={isOpen}>
			<DialogTrigger asChild>
				{!isCreateNewColumn ? (
					<button
						type="button"
						title={`Edit ${board.name}`}
						className="text-mediumGrey dark:hover:text-lightGrey dark:focus:text-lightGrey cursor-pointer whitespace-nowrap text-xs font-medium capitalize outline-none transition-colors hover:text-black focus:text-black"
					>
						Edit board
					</button>
				) : (
					<button
						type="button"
						className="hover:text-purple flex items-center justify-center gap-2 text-xl font-bold capitalize text-gray-500"
					>
						<svg
							width="12"
							height="12"
							xmlns="http://www.w3.org/2000/svg"
							className="mt-1 shrink-0"
						>
							<path
								fill="currentColor"
								d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
							/>
						</svg>
						new column
					</button>
				)}
			</DialogTrigger>
			<DialogPortal>
				<DialogOverlay>
					<DialogContent
						onOpenAutoFocus={(e) => isCreateNewColumn && e.preventDefault()}
					>
						<DialogHeader>Edit Board</DialogHeader>

						<form onSubmit={handleSubmit(onSubmit)}>
							<Label label="Board Name">
								<TextField
									{...register('name')}
									errorMessage={errors.name?.message}
								/>
							</Label>

							{fields.length > 0 && (
								<div className="mt-6">
									<p className="text-mediumGrey mb-2 text-sm font-bold dark:text-white">
										Board Columns
									</p>

									<div className="flex flex-col gap-4">
										{fields.map((column, index) => (
											<div
												key={column.id}
												className={cn('grid grid-cols-[1fr,auto] gap-x-4', {
													'place-items-start':
														errors.columns?.[index]?.value?.message
												})}
											>
												<TextField
													{...register(`columns.${index}.value` as const)}
													errorMessage={errors.columns?.[index]?.value?.message}
												/>
												<ButtonRemoveItemFormFormFieldArray
													type="button"
													title="Remove column"
													onClick={() => handleRemoveField(index)}
												/>
											</div>
										))}
									</div>
								</div>
							)}

							<div className="mt-4 flex flex-col gap-2">
								<Button.Root
									type="button"
									className="text-purple rounded-full bg-[#f2f2f6] py-2.5 text-sm hover:bg-[#D8D7F1] focus:bg-[#D8D7F1]"
									disabled={mutation.isLoading}
									onClick={() =>
										handleInsertField({
											id: crypto.randomUUID(),
											value: ''
										})
									}
								>
									<span className="mb-0.5 block">+</span>Add New Column
								</Button.Root>

								<Button.Root
									className="rounded-full py-2.5 text-sm"
									disabled={Object.keys(errors).length > 0}
									isLoading={mutation.isLoading}
								>
									Save Changes
								</Button.Root>
							</div>
						</form>
					</DialogContent>
				</DialogOverlay>
			</DialogPortal>
		</Dialog>
	);
}
