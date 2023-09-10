import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';

import { useQueryClient } from '@tanstack/react-query';

import {
	Button,
	ButtonLoading,
	ButtonRemoveItemFormFormFieldArray,
	ButtonSelectOrCreateBoard,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTrigger,
	Label,
	TextField
} from '~/shared/components';

import {
	useCreateBoardMutation,
	useInteractiveForm,
	useNotificationToasty
} from '~/hooks';

import { userKeys } from '~/utils';
import { cn } from '~/utils/cn';
import { generateDefaultColumnsBoard } from '~/utils/generate-default-columns-board';

import { CreateNewBoardFormValues, schema } from './schema';

export function FormCreateNewBoard() {
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();
	const { notificationLoading } = useNotificationToasty();
	const mutation = useCreateBoardMutation();
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
			name: 'New Board',
			columns: generateDefaultColumnsBoard()
		}
	});

	const onModalChange = () => {
		if (mutation.isLoading) return;
		setIsOpen((prev) => !prev);
		handleResetForm();
	};

	const onSubmit: SubmitHandler<CreateNewBoardFormValues> = (data) => {
		const { name, columns } = data;
		notificationLoading(
			mutation.mutateAsync({
				name,
				initialColumns: columns.map((col) => col.value)
			}),
			{
				loading: 'Creating board...',
				success: 'Board created successfully',
				error: (e) => e.message
			}
		);
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			queryClient.invalidateQueries({
				queryKey: userKeys.profile
			});
			setIsOpen(false);
		}
	}, [mutation.isSuccess]);

	return (
		<Dialog onOpenChange={onModalChange} open={isOpen}>
			<DialogTrigger asChild>
				<ButtonSelectOrCreateBoard>
					+ Create new board
				</ButtonSelectOrCreateBoard>
			</DialogTrigger>
			<DialogPortal>
				<DialogOverlay>
					<DialogContent>
						<DialogHeader>Add New Board</DialogHeader>

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
												className={cn('grid grid-cols-[1fr,auto] gap-x-4', {
													'place-items-start':
														errors.columns?.[index]?.value?.message
												})}
												key={column.id}
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
								<Button
									type="button"
									variant="neutral"
									onClick={() =>
										handleInsertField({
											id: crypto.randomUUID(),
											value: ''
										})
									}
									disabled={mutation.isLoading}
								>
									<span className="mb-0.5 inline-block font-bold">+</span>Add
									New Column
								</Button>

								<ButtonLoading
									type="submit"
									isLoading={mutation.isLoading}
									fallbackText="Creating"
									disabled={Object.keys(errors).length > 0}
								>
									Create New Board
								</ButtonLoading>
							</div>
						</form>
					</DialogContent>
				</DialogOverlay>
			</DialogPortal>
		</Dialog>
	);
}
