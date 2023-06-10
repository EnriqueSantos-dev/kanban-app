import KanbanLogoSvg from '~/assets/logo.svg';
import {
	AddNewTaskForm,
	DeleteBoardDialog,
	FormEditBoard,
	MobileMenuPopover,
	PopoverEditOrDeleteBoard
} from '~/shared/components';
import { useActiveBoardStore } from '~/stores/active-board-store';
import { useMenuStore } from '~/stores/menu-store';
import { cn } from '~/utils/cn';

export function Header() {
	const { activeBoard, setActiveBoard } = useActiveBoardStore();
	const { isMenuOpen } = useMenuStore();

	return (
		<header className="border-linesLight dark:bg-darkGrey dark:border-linesDark h-20 border-b px-6 pr-3">
			<nav className="flex h-full w-full items-center justify-between">
				<div
					className={cn(
						'border-r-linesLight dark:border-r-linesDark h-full items-center gap-2 border-r pr-8 hidden',
						{
							'md:hidden': isMenuOpen,
							'md:flex': !isMenuOpen
						}
					)}
				>
					<KanbanLogoSvg />
					<p className="text-3xl font-bold leading-relaxed text-black dark:text-white">
						Kanban
					</p>
				</div>

				<div className="flex flex-1 items-center justify-between">
					<div
						className={cn('flex gap-2', {
							'md:ml-6': !isMenuOpen
						})}
					>
						<span className="md:hidden">
							<KanbanLogoSvg />
						</span>

						<h2
							className="max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold capitalize leading-relaxed dark:text-white sm:max-w-[250px] md:max-w-xs md:text-xl"
							title={activeBoard?.name}
						>
							{activeBoard?.name ?? 'No board selected'}
						</h2>
						<MobileMenuPopover />
					</div>

					<div className="flex items-center gap-2">
						<AddNewTaskForm activeBoard={activeBoard} />
						{activeBoard && (
							<PopoverEditOrDeleteBoard>
								<>
									<FormEditBoard
										board={activeBoard}
										setUpdatedBoard={setActiveBoard}
									/>
									<DeleteBoardDialog
										id={activeBoard.id}
										name={activeBoard.name}
									/>
								</>
							</PopoverEditOrDeleteBoard>
						)}
					</div>
				</div>
			</nav>
		</header>
	);
}
