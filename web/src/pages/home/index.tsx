import { Suspense } from 'react';
import { useActiveBoard } from '~/hooks';
import {
	ButtonActiveSidebar,
	ColumnsContainerSkeleton,
	FormEditBoard,
	Header,
	SideBar
} from '~/shared/components';
import { ColumnsContainer } from '~/shared/components/ColumnsContainer';
import { useMenuStore } from '~/stores/menu-store';
import { cn } from '~/utils/cn';

export default function HomePage() {
	const { isMenuOpen } = useMenuStore();
	const { activeBoard, setActiveBoard } = useActiveBoard();

	return (
		<div
			className={cn('grid grid-flow-col', {
				'md:grid-cols-[minmax(auto,300px),1fr]': isMenuOpen
			})}
		>
			<SideBar />
			<div className="grid max-h-screen">
				<Header />
				<main
					className={cn(
						'bg-lightGrey dark:bg-veryDarkGrey h-mainHeight w-full overflow-auto p-10',
						{
							'grid auto-cols-[minmax(250px,280px)] grid-flow-col gap-x-6':
								!!activeBoard,
							'grid place-items-center': !activeBoard
						}
					)}
				>
					{activeBoard ? (
						<>
							<Suspense
								fallback={
									<ColumnsContainerSkeleton activeBoard={activeBoard} />
								}
							>
								<ColumnsContainer activeBoard={activeBoard} />
							</Suspense>

							<div
								aria-label="create new column"
								className="text-mediumGrey hover:text-purple mt-8 flex cursor-pointer items-center justify-center rounded-md bg-gradient-to-br from-[#E9EFFA] to-[#e9effa80] dark:from-[#2b2c3740] dark:to-[#2b2c3720]"
							>
								<FormEditBoard
									board={activeBoard}
									setUpdatedBoard={setActiveBoard}
									isCreateNewColumn
								/>
							</div>
						</>
					) : (
						<div className="flex flex-col justify-center space-y-5">
							<div className="relative h-auto max-w-sm">
								<img
									src="/assets/select-option.svg"
									alt="man pick a option im img"
									className="h-full w-full bg-cover text-center"
								/>
							</div>

							<p className="text-mediumGrey text-center text-lg font-bold lg:text-xl">
								Please select a board to get started.
							</p>
						</div>
					)}
				</main>
				<ButtonActiveSidebar />
			</div>
		</div>
	);
}
