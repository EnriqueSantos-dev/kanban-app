import { useActiveBoardStore } from '~/stores/active-board-store';

export const useActiveBoard = () => {
	const { activeBoard, setActiveBoard } = useActiveBoardStore();

	return { activeBoard, setActiveBoard };
};
