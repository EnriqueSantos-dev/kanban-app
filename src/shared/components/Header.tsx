import KanbanLogoSvg from '~/assets/logo.svg';
import { useActiveBoard } from '~/hooks/useActiveBoard';
import {
	MobileMenuPopover,
	PopoverEditOrDeleteBoard
} from '~/shared/components';
import { useMenuStore } from '~/stores/menu-store';
import { cn } from '~/utils/cn';

export function Header() {
	const { activeBoard } = useActiveBoard();
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
						<button
							type="button"
							className="bg-purple hover:bg-purpleHover focus:ring-purple dark:focus:ring-offset-darkGrey flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3 font-bold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
						>
							<svg
								width="12"
								height="12"
								xmlns="http://www.w3.org/2000/svg"
								className="shrink-0"
							>
								<path
									fill="#fff"
									d="M7.368 12V7.344H12V4.632H7.368V0H4.656v4.632H0v2.712h4.656V12z"
								/>
							</svg>

							<span className="hidden text-sm md:inline-block">
								Add New Task
							</span>
						</button>
						<PopoverEditOrDeleteBoard />
					</div>
				</div>
			</nav>
		</header>
	);
}
