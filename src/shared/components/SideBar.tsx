import KanbanLogoSvg from '~/assets/logo.svg';
import { useMenuStore } from '~/stores/menu-store';
import { cn } from '~/utils/cn';

export function SideBar() {
	const { isMenuOpen } = useMenuStore();

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
			<div className="hidden md:flex md:flex-col md:justify-between">
				<div className="flex h-20 items-center gap-2 px-6 py-4">
					<KanbanLogoSvg />
					<p className="text-2xl font-bold leading-relaxed text-black dark:text-white">
						Kanban
					</p>
				</div>

				<div className="flex flex-1 flex-col gap-4">
					<p className="text-mediumGrey mt-10 px-6 text-xs font-bold uppercase tracking-[2.4px]">
						All boards (1)
					</p>
				</div>
			</div>
		</aside>
	);
}
