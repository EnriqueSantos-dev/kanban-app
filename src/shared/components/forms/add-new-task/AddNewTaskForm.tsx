import { Controller, SubmitHandler } from 'react-hook-form';
import {
	useCreateNewTaskMutation,
	useInteractiveForm,
	useNotificationToasty
} from '~/hooks';
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
	TextArea,
	TextField,
	SelectStatusTask
} from '~/shared/components';
import { cn } from '~/utils/cn';
import { BoardType } from '~/stores/active-board-store';
import { useEffect, useState } from 'react';
import { queryClient } from '~/lib';
import { AddNewTaskFormValues, schema } from './schema';

interface AddNewTaskPropsFormProps {
	activeBoard?: BoardType;
}

export function AddNewTaskForm({ activeBoard }: AddNewTaskPropsFormProps) {
	const [isOpen, setIsOpen] = useState(false);
	const existColumnsInActiveBoard =
		activeBoard?.columns && !!activeBoard.columns.length;
	const options = existColumnsInActiveBoard
		? activeBoard.columns.map((column) => ({
				id: column.id,
				value: column.name
		  }))
		: [];
	const defaultOption = options.length > 0 ? options[0] : undefined;
	const notification = useNotificationToasty();
	const mutation = useCreateNewTaskMutation();
	const {
		register,
		handleSubmit,
		control,
		fields,
		handleAppendField,
		handleRemoveField,
		handleResetForm,
		formState: { errors }
	} = useInteractiveForm({
		schema,
		interactiveFieldName: 'subtasks',
		defaultValues: {
			name: '',
			description: '',
			columnId: defaultOption?.id || '',
			subtasks: [{ id: crypto.randomUUID(), value: 'New task' }]
		}
	});

	const onSubmit: SubmitHandler<AddNewTaskFormValues> = (data) => {
		mutation.mutate({
			subTasks: data.subtasks.map((subtask) => ({
				title: subtask.value,
				isDone: false
			})),
			title: data.name,
			description: data.description || '',
			columnId: data.columnId
		});
	};

	const onChangeOpen = () => {
		setIsOpen((prev) => !prev);
		handleResetForm();
	};

	useEffect(() => {
		if (mutation.error) {
			notification(
				'error',
				mutation.error?.response?.data?.message ||
					'Something went wrong. Try again later.'
			);
		}
	}, [mutation.error]);

	useEffect(() => {
		if (mutation.isSuccess && mutation.data) {
			notification('success', 'Task created successfully');
			queryClient.invalidateQueries({
				queryKey: ['column', { id: mutation.data.id }]
			});
			setIsOpen(false);
			handleResetForm();
		}
	}, [mutation.isSuccess]);

	return (
		<Dialog open={isOpen} onOpenChange={onChangeOpen}>
			<DialogTrigger
				type="button"
				disabled={options.length === 0}
				className="bg-purple hover:bg-purpleHover focus:ring-purple dark:focus:ring-offset-darkGrey flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3 font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
			>
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
			</DialogTrigger>
			<DialogPortal>
				<DialogOverlay />
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
												errorMessage={errors.subtasks?.[index]?.value?.message}
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
									<Button.Root
										type="button"
										className={cn(
											'text-purple rounded-full bg-[#f2f2f6] py-2.5 text-sm hover:bg-[#D8D7F1] focus:bg-[#D8D7F1]',
											{
												'mb-4 my-0': fields.length > 0,
												'my-4': fields.length === 0
											}
										)}
										disabled={mutation.isLoading}
										onClick={() =>
											handleAppendField({ id: crypto.randomUUID(), value: '' })
										}
									>
										<span className="mb-0.5 block">+</span>Add New SubTask
									</Button.Root>
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

						<Button.Root
							className="rounded-full py-2.5 text-sm"
							disabled={Object.keys(errors).length > 0 || mutation.isLoading}
						>
							Create Task
						</Button.Root>
					</form>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
}
