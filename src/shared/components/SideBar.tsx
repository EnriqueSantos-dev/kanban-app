import { useCallback } from 'react';
import KanbanLogoSvg from '~/assets/logo.svg';
import { useActiveBoard } from '~/hooks/useActiveBoard';
import {
	ButtonSelectOrCreateBoard,
	ChangeThemeButton,
	FormCreateNewBoard
} from '~/shared/components';
import { BoardType } from '~/stores/active-board-store';
import { useAuthStore } from '~/stores/auth-store';
import { useMenuActions, useMenuStore } from '~/stores/menu-store';
import { cn } from '~/utils/cn';

export function SideBar() {
	const { activeBoard, setActiveBoard } = useActiveBoard();
	const { setIsMenuOpen } = useMenuActions();
	const isMenuOpen = useMenuStore((state) => state.isMenuOpen);
	const boards = useAuthStore((state) => state.user?.boards);

	const handleChangeActiveBoard = useCallback(
		(board: BoardType) => {
			if (activeBoard?.id === board.id) return;
			setActiveBoard(board);
		},
		[activeBoard?.id]
	);

	return (
		<aside
			className={cn(
				'md:border-linesLight md:max-h-screen md:h-full absolute top-20 w-full px-6 md:relative md:top-0 md:border-r md:px-0 md:dark:bg-darkGrey dark:border-linesDark',
				{
					'md:hidden': !isMenuOpen,
					'md:block': isMenuOpen
				}
			)}
		>
			<div className="hidden h-full md:flex md:flex-col md:justify-between">
				<div className="flex h-20 items-center gap-2 px-6 py-4">
					<KanbanLogoSvg />
					<p className="text-3xl font-bold leading-relaxed text-black dark:text-white">
						Kanban
					</p>
				</div>

				<div className="max-h-maxSidebarHeight relative flex flex-1 flex-col gap-4">
					<div className="flex flex-col gap-2">
						<p className="text-mediumGrey mt-10 px-6 text-xs font-bold uppercase tracking-[2.4px]">
							All boards ({boards?.length})
						</p>

						<FormCreateNewBoard />
					</div>

					<div className="scrollbar-thin peer flex-1 overflow-auto pb-10">
						{boards?.map((board) => (
							<ButtonSelectOrCreateBoard
								key={board.id}
								isActive={activeBoard?.id === board.id}
								onClick={() => handleChangeActiveBoard(board)}
							>
								{board.name}
							</ButtonSelectOrCreateBoard>
						))}
					</div>

					<span className="dark:to-darkGrey/20 dark:from-darkGrey pointer-events-none absolute bottom-0 h-8 w-full bg-gradient-to-t from-white to-white/10 transition-opacity duration-75 peer-hover:invisible peer-hover:opacity-0" />
				</div>

				<div className="flex flex-col gap-2 py-6">
					<div className="px-6">
						<ChangeThemeButton />
					</div>

					<button
						type="button"
						className="text-mediumGrey hover:text-purple hover:bg-purple/10 bg-purple/0 focus:ring-purple dark:focus:ring-offset-darkGrey group max-w-[90%] rounded-r-full p-4 pl-6 text-sm font-bold transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-white dark:hover:bg-white dark:focus:bg-white md:flex md:items-center"
						onClick={() => setIsMenuOpen(false)}
					>
						<svg
							width="18"
							height="16"
							xmlns="http://www.w3.org/2000/svg"
							className="fill-mediumGrey group-focus:fill-purple group-hover:fill-purple mr-4 mt-[0.15rem]"
						>
							<path d="M8.522 11.223a4.252 4.252 0 0 1-3.654-5.22l3.654 5.22ZM9 12.25A8.685 8.685 0 0 1 1.5 8a8.612 8.612 0 0 1 2.76-2.864l-.86-1.23A10.112 10.112 0 0 0 .208 7.238a1.5 1.5 0 0 0 0 1.524A10.187 10.187 0 0 0 9 13.75c.414 0 .828-.025 1.239-.074l-1-1.43A8.88 8.88 0 0 1 9 12.25Zm8.792-3.488a10.14 10.14 0 0 1-4.486 4.046l1.504 2.148a.375.375 0 0 1-.092.523l-.648.453a.375.375 0 0 1-.523-.092L3.19 1.044A.375.375 0 0 1 3.282.52L3.93.068a.375.375 0 0 1 .523.092l1.735 2.479A10.308 10.308 0 0 1 9 2.25c3.746 0 7.031 2 8.792 4.988a1.5 1.5 0 0 1 0 1.524ZM16.5 8a8.674 8.674 0 0 0-6.755-4.219A1.75 1.75 0 1 0 12.75 5v-.001a4.25 4.25 0 0 1-1.154 5.366l.834 1.192A8.641 8.641 0 0 0 16.5 8Z" />
						</svg>
						Hide Sidebar
					</button>
				</div>
			</div>
		</aside>
	);
}
