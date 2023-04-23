import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BOARD_ACTIVE_KEY } from '~/constants/board-active';

export type BoardType = {
	id: string;
	name: string;
	columns: {
		id: string;
		name: string;
	}[];
};

type ActiveBoardState = {
	activeBoard: BoardType | undefined;
	setActiveBoard: (boardId: BoardType) => void;
};

export const useActiveBoardStore = create(
	persist<ActiveBoardState>(
		(set) => ({
			activeBoard: undefined,
			setActiveBoard: (board: BoardType) => set({ activeBoard: board })
		}),
		{
			name: BOARD_ACTIVE_KEY
		}
	)
);
