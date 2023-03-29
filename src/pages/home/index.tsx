import { useAuthContext } from '~/contexts/auth';
import { Header, LoadingPage, SideBar } from '~/shared/components';
import { ButtonActiveSidebar } from '~/shared/components/ButtonActiveSidebar';
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
				<main className="bg-lightGrey dark:bg-veryDarkGrey h-mainHeight grid-auto-col-min-300 w-full gap-x-6 overflow-auto p-10">
					{/* columns of board in here */}
				</main>

				<ButtonActiveSidebar />
			</div>
		</div>
	);
}
