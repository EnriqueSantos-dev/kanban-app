import { BoardType } from '~/stores/active-board-store';

import { SkeletonTask } from './SkeletonTask';

type ColumnsContainerSkeletonProps = {
	activeBoard: BoardType;
};

export function ColumnsContainerSkeleton({
	activeBoard
}: ColumnsContainerSkeletonProps) {
	return (
		<>
			{activeBoard.columns.map((col) => (
				<div className="flex h-full flex-col justify-start gap-4" key={col.id}>
					<div className="text-mediumGrey flex gap-2 overflow-hidden text-xs font-bold uppercase">
						<span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
							{col.name}
						</span>
					</div>

					<ul className="text-hxl text-mediumGrey hover:text-purple flex w-full flex-1 cursor-pointer flex-col gap-3 rounded-md">
						{Array.from({ length: 8 }).map((_, i) => (
							// eslint-disable-next-line react/no-array-index-key
							<SkeletonTask key={i} />
						))}
					</ul>
				</div>
			))}
		</>
	);
}
