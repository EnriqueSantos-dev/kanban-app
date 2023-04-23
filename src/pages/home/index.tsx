import { useAuthContext } from '~/contexts/auth';
import {
	Header,
	LoadingPage,
	SideBar,
	ButtonActiveSidebar,
	ColumnCreateNewBoard
} from '~/shared/components';
import { useMenuStore } from '~/stores/menu-store';
import { cn } from '~/utils/cn';

export function HomePage() {
	const { isLoading } = useAuthContext();
	const { isMenuOpen } = useMenuStore();

	if (isLoading) {
		return <LoadingPage />;
	}

	return (
		<div
			className={cn('grid grid-cols-1', {
				'md:grid-cols-[minmax(auto,300px),1fr]': isMenuOpen,
				'md:grid-cols-1': !isMenuOpen
			})}
		>
			<SideBar />
			<div className="grid max-h-screen">
				<Header />
				<main className="bg-lightGrey dark:bg-veryDarkGrey h-mainHeight auto-cols-[minmax(280px, 300px)] grid w-full grid-flow-col gap-x-6 overflow-auto p-10">
					<ColumnCreateNewBoard />
				</main>
				<ButtonActiveSidebar />
			</div>
		</div>
	);
}
