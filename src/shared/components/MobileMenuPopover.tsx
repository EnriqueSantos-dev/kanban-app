import * as Dialog from '@radix-ui/react-dialog';
import { useActiveBoardStore, BoardType } from '~/stores/active-board-store';
import { useAuthStore } from '~/stores/auth-store';
import {
	ButtonSelectOrCreateBoard,
	ChangeThemeButton,
	FormCreateNewBoard
} from '~/shared/components';

export function MobileMenuPopover() {
	const boards = useAuthStore((state) => state.user?.boards);
	const { activeBoard, setActiveBoard } = useActiveBoardStore();

	const handleChangeActiveBoard = (board: BoardType) => {
		if (activeBoard?.id === board.id) return;
		setActiveBoard(board);
	};

	return (
		<Dialog.Root>
			<Dialog.Trigger
				aria-label="trigger open modal mobile menu"
				className="group flex w-4 shrink-0 cursor-pointer items-center justify-center rounded-full outline-none md:hidden"
			>
				<svg
					className="text-purple group-hover:text-purpleHover group-focus:text-purpleHover mt-1 rotate-180 transition-all group-data-[state=open]:rotate-0"
					width="12"
					height="9"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeWidth="2"
						stroke="currentColor"
						fill="none"
						d="M9 6 5 2 1 6"
					/>
				</svg>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="animate-fade-out data-[state=open]:animate-fade-in fixed inset-0 bg-black/50" />
				<Dialog.Content className="animate-fade-out dark:bg-darkGrey data-[state=open]:animate-fade-in fixed left-1/2 top-24 flex w-full max-w-xs origin-center -translate-x-1/2 flex-col gap-4 rounded-lg bg-white shadow-sm md:hidden">
					<div className="px-6 pb-5 pt-4">
						<p className="text-mediumGrey text-xs font-bold uppercase tracking-[2.4px]">
							All boards ({boards?.length})
						</p>
					</div>

					<div className="flex max-h-80 snap-mandatory flex-col overflow-y-auto pr-6">
						{boards?.map((board) => (
							<ButtonSelectOrCreateBoard
								key={board.id}
								isActive={activeBoard?.id === board.id}
								onClick={() => handleChangeActiveBoard(board)}
							>
								{board.name}
							</ButtonSelectOrCreateBoard>
						))}

						<FormCreateNewBoard />
					</div>

					<div className="px-6 py-4">
						<ChangeThemeButton />
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
