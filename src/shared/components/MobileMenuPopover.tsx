import * as Dialog from '@radix-ui/react-dialog';
import { useActiveBoard } from '~/hooks/useActiveBoard';
import { useAuthStore } from '~/stores/auth-store';
import { useCallback, useState } from 'react';
import { ButtonSelectOrCreateBoard } from './ButtonSelectOrCreateBoard';
import { ChangeThemeButton } from './ChangeTheme';

export function MobileMenuPopover() {
	const [open, setOpen] = useState(false);
	const boards = useAuthStore((state) => state.user?.boards);
	const { activeBoard, setActiveBoard } = useActiveBoard();

	const handleChangeActiveBoard = useCallback(
		({ id, name }: { id: string; name: string }) => {
			if (activeBoard?.id === id) return;
			setActiveBoard({ id, name });
			setOpen(false);
		},
		[activeBoard?.id]
	);

	return (
		<Dialog.Root open={open} onOpenChange={() => setOpen((prev) => !prev)}>
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
				<Dialog.Overlay className="animate-fade-out data-[state=open]:animate-fade-in absolute inset-0 bg-black/50" />
				<Dialog.Content className="animate-fade-out dark:bg-darkGrey data-[state=open]:animate-fade-in fixed left-1/2 top-24 flex w-[300px] origin-center -translate-x-1/2 flex-col gap-4 rounded-lg bg-white shadow-sm md:hidden">
					<div className="px-6 pt-4 pb-5">
						<p className="text-mediumGrey text-xs font-bold uppercase tracking-[2.4px]">
							All boards ({boards?.length})
						</p>
					</div>

					<div className="flex max-h-80 snap-mandatory flex-col overflow-y-auto pr-6">
						{boards?.map((board) => (
							<ButtonSelectOrCreateBoard
								key={board.id}
								isActive={activeBoard?.id === board.id}
								onClick={() =>
									handleChangeActiveBoard({ id: board.id, name: board.name })
								}
							>
								{board.name}
							</ButtonSelectOrCreateBoard>
						))}

						<ButtonSelectOrCreateBoard>
							+Create new board
						</ButtonSelectOrCreateBoard>
					</div>

					<div className="px-6 py-4">
						<ChangeThemeButton />
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
