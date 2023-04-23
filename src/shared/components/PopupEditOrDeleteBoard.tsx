import * as Popover from '@radix-ui/react-popover';
import { cn } from '~/utils/cn';
import { FormEditBoard } from '~/shared/components';
import { BoardType } from '~/stores/active-board-store';

interface PopoverEditOrDeleteBoardProps {
	activeBoard?: BoardType;
	setActiveBoard: (board: BoardType) => void;
}

export function PopoverEditOrDeleteBoard({
	activeBoard,
	setActiveBoard
}: PopoverEditOrDeleteBoardProps) {
	if (!activeBoard) {
		return null;
	}

	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button
					type="button"
					title={`Edit board ${activeBoard.name}`}
					className="group flex h-5 items-center justify-center px-3 outline-none"
				>
					<svg
						width="5"
						height="20"
						xmlns="http://www.w3.org/2000/svg"
						className="group-focus:fill-purple fill-mediumGrey hover:fill-purple dark:hover:fill-purpleHover cursor-pointer"
					>
						<g fillRule="evenodd">
							<circle cx="2.308" cy="2.308" r="2.308" />
							<circle cx="2.308" cy="10" r="2.308" />
							<circle cx="2.308" cy="17.692" r="2.308" />
						</g>
					</svg>
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content
					className={cn(
						'absolute transition-all top-10 rounded-md bg-white p-4 right-0 w-44 shadow-md dark:bg-darkGrey data-[state=open]:animate-fade-in data-[state=open]:animate-scale-up group-data-[state=closed]:animate-fade-out'
					)}
				>
					<ul className="flex flex-col items-start gap-4">
						<li>
							<FormEditBoard
								board={activeBoard}
								setUpdatedBoard={setActiveBoard}
							/>
						</li>
						<li>
							<button
								type="button"
								title={`Delete ${activeBoard.name}`}
								className="text-red dark:hover:text-redHover  dark:focus:text-redHover cursor-pointer whitespace-nowrap text-xs font-medium capitalize outline-none transition-colors hover:text-[#BC2727] focus:text-[#BC2727]"
							>
								Delete board
							</button>
						</li>
					</ul>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
