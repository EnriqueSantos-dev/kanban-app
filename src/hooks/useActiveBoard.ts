import { useActiveBoardStore } from '~/stores/active-board-store';

export const useActiveBoard = () => {
	const activeBoard = useActiveBoardStore((state) => state.activeBoard);
	const setActiveBoard = useActiveBoardStore((state) => state.setActiveBoard);

	return { activeBoard, setActiveBoard };
};
