import * as Popover from '@radix-ui/react-popover';

import { cn } from '~/utils/cn';

interface PopoverEditOrDeleteBoardProps {
	children: React.ReactNode;
}

export function PopoverEditOrDeleteBoard({
	children
}: PopoverEditOrDeleteBoardProps) {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button
					type="button"
					aria-label="Edit or delete board"
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
					<ul className="flex flex-col items-start gap-4">{children}</ul>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
