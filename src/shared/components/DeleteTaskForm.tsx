import { useEffect } from 'react';
import { useNotificationToasty } from '~/hooks';
import { useDeleteTask } from '~/hooks/useDeleteTask';
import { Button } from './Button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogPortal
} from './Dialog';

type DeleteTaskFormProps = {
	id: string;
	isOpenModal: boolean;
	onChangeModalState: () => void;
};

export function DeleteTaskForm({
	id,
	isOpenModal,
	onChangeModalState
}: DeleteTaskFormProps) {
	const mutation = useDeleteTask();
	const { notificationLoading } = useNotificationToasty();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		notificationLoading(mutation.mutateAsync({ taskId: id }), {
			loading: 'Deleting task...',
			success: 'Task deleted successfully',
			error: 'Error deleting task'
		});
	};

	useEffect(() => {
		if (mutation.isSuccess) {
			onChangeModalState();
		}
	}, [mutation.isSuccess]);

	return (
		<Dialog open={isOpenModal} onOpenChange={onChangeModalState}>
			<DialogPortal>
				<DialogOverlay>
					<DialogContent>
						<DialogHeader className="mb-2">Delete Task</DialogHeader>
						<p className="text-mediumGrey">
							Are you sure you want to delete this task? This action is
							irreversible and all associated data will be permanently removed.
						</p>

						<form
							className="mt-6 grid grid-cols-2 gap-x-4"
							onSubmit={handleSubmit}
						>
							<Button.Root
								type="submit"
								aria-label="confirm delete task"
								className="bg-red hover:bg-redHover focus:bg-redHover mt-0 h-10 rounded-full font-bold capitalize text-white outline-none transition-colors"
								disabled={mutation.isLoading}
							>
								confirm
							</Button.Root>

							<DialogClose
								type="button"
								className="h-10 rounded-full bg-green-500 font-bold capitalize text-white outline-none transition-colors hover:bg-green-600 focus:bg-green-600"
								disabled={mutation.isLoading}
							>
								cancel
							</DialogClose>
						</form>
					</DialogContent>
				</DialogOverlay>
			</DialogPortal>
		</Dialog>
	);
}
