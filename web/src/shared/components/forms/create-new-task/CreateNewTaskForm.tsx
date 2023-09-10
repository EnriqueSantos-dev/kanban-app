import { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';

import {
	Button,
	ButtonLoading,
	ButtonRemoveItemFormFormFieldArray,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTrigger,
	Label,
	SelectStatusTask,
	TextArea,
	TextField
} from '~/shared/components';

import { BoardType } from '~/stores/active-board-store';

import {
	useCreateNewTaskMutation,
	useInteractiveForm,
	useNotificationToasty
} from '~/hooks';

import { cn, mapperTaskToCreate } from '~/utils';

import { AddNewTaskFormValues, schema } from './schema';

interface AddNewTaskPropsFormProps {
	activeBoard?: BoardType;
}

const useGetInitialOptionsFromBoard = (board?: BoardType) => {
	const existColumnsInActiveBoard = board?.columns && !!board.columns.length;
	const options = existColumnsInActiveBoard
		? board.columns.map((column) => ({
				id: column.id,
				value: column.name
		  }))
		: [];
	const defaultOption = options.length > 0 ? options[0] : undefined;

	return { options, defaultOption };
};

export function AddNewTaskForm({ activeBoard }: AddNewTaskPropsFormProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { options, defaultOption } = useGetInitialOptionsFromBoard(activeBoard);
	const { notificationLoading } = useNotificationToasty();
	const mutation = useCreateNewTaskMutation();
	const {
		register,
		handleSubmit,
		control,
		fields,
		handleInsertField,
		handleRemoveField,
		handleResetForm,
		formState: { errors }
	} = useInteractiveForm({
		schema,
		interactiveFieldName: 'subtasks',
		defaultValues: {
			name: 'New task',
			description: '',
			columnId: defaultOption?.id || '',
			subtasks: [{ id: crypto.randomUUID(), value: 'New task' }]
		}
	});

	const onSubmit: SubmitHandler<AddNewTaskFormValues> = (data) => {
		notificationLoading(mutation.mutateAsync(mapperTaskToCreate(data)), {
			success: 'Task created successfully',
			loading: 'Creating task...',
			error: (e) => `${e.message}`
		});
	};

	const onChangeOpen = () => {
		setIsOpen((prev) => !prev);
		handleResetForm();
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			setIsOpen(false);
			handleResetForm();
		}
	}, [mutation.isSuccess]);

	return (
		<Dialog open={isOpen} onOpenChange={onChangeOpen}>
			<DialogTrigger asChild type="button" disabled={options.length === 0}>
				<Button className="px-4 py-2">
					<svg
						width="12"
						height="12"
						xmlns="http://www.w3.org/2000/svg"
						className="shrink-0"
					>
						<path
							fill="#fff"
							d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
						/>
					</svg>

					<span className="hidden text-sm md:inline-block">Add New Task</span>
				</Button>
			</DialogTrigger>
			<DialogPortal>
				<DialogOverlay>
					<DialogContent>
						<DialogHeader>Add New Task</DialogHeader>

						<form onSubmit={handleSubmit(onSubmit)}>
							<Label label="Title">
								<TextField
									placeholder="e.g. Take coffee break"
									{...register('name')}
									errorMessage={errors.name?.message}
								/>
							</Label>

							<Label label="Description" className="mt-4">
								<TextArea
									{...register('description')}
									placeholder="e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little."
									errorMessage={errors.description?.message}
								/>
							</Label>

							{fields.length > 0 && (
								<div className="mt-6">
									<p className="text-mediumGrey mb-2 text-[13px] font-bold dark:text-white">
										Subtasks
									</p>

									<div className="flex flex-col gap-4">
										{fields.map((column, index) => (
											<div
												className={cn('grid grid-cols-[1fr,auto] gap-x-4', {
													'place-items-start':
														errors.subtasks?.[index]?.value?.message
												})}
												key={column.id}
											>
												<TextField
													{...register(`subtasks.${index}.value` as const)}
													errorMessage={
														errors.subtasks?.[index]?.value?.message
													}
												/>
												<ButtonRemoveItemFormFormFieldArray
													title="Remove column"
													isErrorInField={
														!!errors.subtasks?.[index]?.value?.message
													}
													onClick={() => handleRemoveField(index)}
												/>
											</div>
										))}
										<Button
											variant="neutral"
											className={cn({
												'mb-4 my-0': fields.length > 0,
												'my-4': fields.length === 0
											})}
											disabled={mutation.isLoading}
											onClick={() =>
												handleInsertField({
													id: crypto.randomUUID(),
													value: ''
												})
											}
										>
											<span className="mb-0.5 inline-block font-bold">+</span>
											Add New SubTask
										</Button>
									</div>
								</div>
							)}

							<div className="my-6">
								<Controller
									name="columnId"
									defaultValue={defaultOption?.id}
									control={control}
									render={({ field: { onChange, value } }) => (
										<Label label="Status">
											<SelectStatusTask
												options={options}
												defaultOption={defaultOption}
												value={value}
												onValueChange={onChange}
												disabled={options.length === 0}
											/>
										</Label>
									)}
								/>
							</div>

							<ButtonLoading
								type="submit"
								isLoading={mutation.isLoading}
								fallbackText="Creating"
								disabled={Object.keys(errors).length > 0}
							>
								Create Task
							</ButtonLoading>
						</form>
					</DialogContent>
				</DialogOverlay>
			</DialogPortal>
		</Dialog>
	);
}
