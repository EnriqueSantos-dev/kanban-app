export function LoadingPage() {
	return (
		<div className="dark:bg-darkGrey grid h-screen w-screen place-content-center place-items-center">
			<p className="text-mediumGrey flex animate-pulse items-center gap-3 text-3xl font-bold leading-relaxed dark:text-white">
				<svg
					className="mt-1 block"
					width="25"
					height="25"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g fill="#635FC7" fillRule="evenodd">
						<rect width="6" height="25" rx="2" />
						<rect opacity=".75" x="9" width="6" height="25" rx="2" />
						<rect opacity=".5" x="18" width="6" height="25" rx="2" />
					</g>
				</svg>
				Kanban
			</p>
		</div>
	);
}
