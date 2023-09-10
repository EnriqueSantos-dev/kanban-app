import { useId } from 'react';

import * as CheckBox from '@radix-ui/react-checkbox';

import { cn } from '~/utils';

import { SubTask } from '~/types';

type ToggleSubTaskCardProps = SubTask & {
	isChecked: boolean;
	onChangeStatus: (data: { subTaskId: string; isDone: boolean }) => void;
};

export function ToggleSubTaskCard({
	id,
	name,
	isChecked,
	onChangeStatus
}: ToggleSubTaskCardProps) {
	const checkboxId = useId();

	return (
		<li
			className="dark:bg-veryDarkGrey hover:bg-purple/[14%] bg-lightGrey flex h-12 w-full items-center gap-4 rounded-md px-1"
			tabIndex={-1}
		>
			<CheckBox.Root
				id={`${checkboxId}-${id}`}
				defaultChecked={isChecked}
				onCheckedChange={() => {
					onChangeStatus({ subTaskId: id, isDone: !isChecked });
				}}
				className={cn(
					'ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded border transition-colors',
					{
						'bg-purple border-transparent': isChecked,
						'dark:bg-darkGrey bg-white border-zinc-300 dark:border-zinc-600':
							!isChecked
					}
				)}
			>
				<CheckBox.Indicator className="text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="animated-svg"
					>
						<path d="M20 6L9 17L4 12" />
					</svg>
				</CheckBox.Indicator>
			</CheckBox.Root>
			<label
				htmlFor={`${checkboxId}-${id}`}
				className={cn(
					'flex-1 text-mediumGrey font-bold cursor-pointer block text-sm',
					{
						'line-through': isChecked
					}
				)}
			>
				{name}
			</label>
		</li>
	);
}
