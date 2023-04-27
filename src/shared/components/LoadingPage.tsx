import { useAuthContext } from '~/contexts/auth';
import { useTheme } from '~/hooks';

export function LoadingPage() {
	// call useAuthContext to make sure the user is loaded before all others hooks
	useAuthContext();
	// call useTheme to make sure the theme is loaded
	useTheme();

	return (
		<div className="dark:bg-darkGrey grid h-screen w-screen place-content-center place-items-center">
			<p className="text-mediumGrey flex animate-pulse items-center gap-3 text-3xl font-bold leading-relaxed dark:text-white md:text-5xl">
				<img
					src="/assets/logo.svg"
					alt="Logo"
					className="h-6 w-6 md:h-10 md:w-10"
				/>
				Kanban
			</p>
		</div>
	);
}
