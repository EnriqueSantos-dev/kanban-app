import { useActiveBoard } from '~/hooks';
import { FormEditBoard } from './forms/edit-board/FormEditBoard';

export function ColumnCreateNewBoard() {
	const { activeBoard, setActiveBoard } = useActiveBoard();

	if (!activeBoard) {
		return null;
	}

	return (
		<div
			aria-label="create new column"
			className="text-hxl text-mediumGrey hover:text-purple mt-10 flex min-h-[90%] w-[17.5rem] min-w-[17.5rem] max-w-[17.5rem] cursor-pointer items-center justify-center rounded-md bg-gradient-to-br from-[#E9EFFA] to-[#e9effa80] dark:from-[#2b2c3740] dark:to-[#2b2c3720]"
		>
			<FormEditBoard
				board={activeBoard}
				setUpdatedBoard={setActiveBoard}
				isCreateNewColumn
			/>
		</div>
	);
}
