type TaskCardProps = {
	completedSubtasksCount: number;
	name: string;
	totalSubtasksCount: number;
};

export function OverlayTaskCard({
	completedSubtasksCount,
	name,
	totalSubtasksCount
}: TaskCardProps) {
	return (
		<div
			aria-label="task card overlay"
			className="dark:bg-darkGrey shadow-taskCard focus:ring-purple h-[90px] touch-manipulation rounded-lg border-none bg-white px-4 py-6 outline-none transition duration-200 ease-in-out focus:ring-1 focus:ring-offset-1"
		>
			<p className="max-w-[150px] text-ellipsis text-base/6 font-bold text-black dark:text-white">
				{name}
			</p>

			{totalSubtasksCount > 0 && (
				<span className="text-mediumGrey text-xs font-bold">
					{`${completedSubtasksCount} of  ${totalSubtasksCount}`}
				</span>
			)}
		</div>
	);
}
