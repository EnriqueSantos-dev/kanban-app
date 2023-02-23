import { Outlet } from 'react-router-dom';

export function AuthLayout() {
	return (
		<main className="flex min-h-screen w-screen items-center justify-center p-6 dark:bg-black md:p-0">
			<div className="flex w-full flex-col items-center gap-4 md:min-w-[384px] md:max-w-sm">
				<p className="text-mediumGrey flex items-center gap-3 text-xl font-medium dark:text-white">
					<svg width="22" height="23" xmlns="http://www.w3.org/2000/svg">
						<g fill="#635FC7" fillRule="evenodd">
							<rect width="6" height="25" rx="2" />
							<rect opacity=".75" x="9" width="6" height="25" rx="2" />
							<rect opacity=".5" x="18" width="6" height="25" rx="2" />
						</g>
					</svg>
					Kanban
				</p>
				<Outlet />
			</div>
		</main>
	);
}
