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
							<Button
								type="submit"
								variant="destructive"
								aria-label="confirm delete task"
								disabled={mutation.isLoading}
							>
								Confirm
							</Button>

							<DialogClose type="button" asChild disabled={mutation.isLoading}>
								<Button>Cancel</Button>
							</DialogClose>
						</form>
					</DialogContent>
				</DialogOverlay>
			</DialogPortal>
		</Dialog>
	);
}
