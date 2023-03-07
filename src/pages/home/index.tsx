import { useAuthContext } from '~/contexts/auth';
import { Header, LoadingPage, SideBar } from '~/shared/components';
import { useMenuStore } from '~/stores/menu-store';
import { cn } from '~/utils/cn';

export function HomePage() {
	const { isLoading, user } = useAuthContext();
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
			<div>
				<Header />
				<main className="bg-lightGrey dark:bg-veryDarkGrey h-mainHeight p-10">
					<h1 className="mb-4 text-xl font-bold text-black dark:text-white">
						Hello {user?.name} 👏
					</h1>
					<pre className="max-w-md snap-mandatory overflow-auto dark:text-white">
						{JSON.stringify(user, null, 2)}
					</pre>
				</main>
			</div>
		</div>
	);
}
