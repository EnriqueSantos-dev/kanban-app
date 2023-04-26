import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteBoardMutation, useNotificationToasty } from '~/hooks';
import { userKeys } from '~/utils';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTrigger
} from './Dialog';

interface DeleteBoardDialogProps {
	id: string;
	name: string;
}

export function DeleteBoardDialog({ id, name }: DeleteBoardDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const queryClient = useQueryClient();
	const notification = useNotificationToasty();
	const mutation = useDeleteBoardMutation();

	const handleDeleteBoard = useCallback(
		(boardID: string) => mutation.mutate({ id: boardID }),
		[id]
	);

	const onModalChange = () => setIsOpen((prev) => !prev);

	useEffect(() => {
		if (mutation.isSuccess) {
			queryClient.invalidateQueries({
				queryKey: userKeys.profile
			});
			notification('success', 'Board deleted successfully');
			setIsOpen(false);
		}
	}, [mutation.isSuccess]);

	useEffect(() => {
		if (mutation.error) {
			notification(
				'error',
				mutation.error?.response?.data?.message ||
					'Something went wrong, try again later'
			);
		}
	}, [mutation.error]);

	return (
		<Dialog open={isOpen} onOpenChange={onModalChange}>
			<DialogTrigger className="text-red dark:hover:text-redHover  dark:focus:text-redHover cursor-pointer whitespace-nowrap text-xs font-medium capitalize outline-none transition-colors hover:text-[#BC2727] focus:text-[#BC2727]">
				Delete Board
			</DialogTrigger>
			<DialogPortal>
				<DialogOverlay />
				<DialogContent>
					<DialogHeader className="text-red dark:text-red">
						Delete This Board?
					</DialogHeader>
					<p className="text-mediumGrey my-6 text-[13px]">
						Are you sure you want to delete the <strong>{name} </strong>board?
						This action will remove all columns and tasks and cannot be
						reversed.
					</p>

					<div className="grid grid-cols-2 gap-x-4">
						<button
							type="button"
							aria-label="confirm delete board"
							className="bg-red hover:bg-redHover h-10 w-full rounded-full text-[0.8125rem] font-bold text-white transition-colors"
							onClick={() => handleDeleteBoard(id)}
						>
							Delete
						</button>

						<DialogClose
							type="button"
							aria-label="cancel delete board"
							className="text-hl text-purple w-full rounded-full bg-[#F2F2F6] p-2 text-[0.8125rem] font-bold hover:bg-[#D8D7F1]"
						>
							Cancel
						</DialogClose>
					</div>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
}
