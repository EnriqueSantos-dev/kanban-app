import { useEffect } from 'react';
import { useActiveBoardStore } from '~/stores/active-board-store';
import { useAuthStore } from '~/stores/auth-store';

export const useActiveBoard = () => {
	const { user } = useAuthStore();
	const { activeBoard, setActiveBoard } = useActiveBoardStore();

	useEffect(() => {
		if (activeBoard) {
			const existingBoard = user?.boards.find(
				(board) => board.id === activeBoard.id
			);

			if (!existingBoard) {
				setActiveBoard(undefined);
			}
		}
	}, []);

	return { activeBoard, setActiveBoard };
};
