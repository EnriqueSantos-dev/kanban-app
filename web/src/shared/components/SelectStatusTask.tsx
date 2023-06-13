import * as Select from '@radix-ui/react-select';
import { cn } from '~/utils/cn';

export type Option = {
	id: string;
	value: string;
};

interface SelectStatusTaskProps
	extends React.ComponentProps<typeof Select.Root> {
	options: Option[];
	defaultOption?: Option;
}

export function SelectStatusTask({
	onValueChange,
	options,
	defaultOption,
	...props
}: SelectStatusTaskProps) {
	return (
		<Select.Root
			defaultValue={defaultOption?.id}
			onValueChange={onValueChange}
			{...props}
		>
			<Select.Trigger
				className={cn(
					'relative flex w-full items-center justify-between gap-2 rounded bg-transparent px-4 h-8 text-sm font-medium text-black outline-none ring-1 ring-transparent transition-colors duration-300 placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500 ring-gray-300 dark:ring-linesDark dark:focus:ring-purple dark:hover:ring-purple focus:ring-purple hover:ring-purple disabled:opacity-50 disabled:pointer-events-none'
				)}
				arial-label="status"
			>
				<Select.Value placeholder={defaultOption?.value} />
				<Select.Icon asChild>
					<svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
						<path
							stroke="#635FC7"
							strokeWidth="2"
							fill="none"
							d="m1 1 4 4 4-4"
						/>
					</svg>
				</Select.Icon>
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					className="dark:bg-veryDarkGrey animate-in fade-in-80 min-h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] translate-y-1 rounded bg-white shadow-sm dark:shadow-none"
					position="popper"
					side="bottom"
					sideOffset={5}
				>
					<Select.Viewport className="flex flex-col gap-2 p-4">
						{options.map((option) => (
							<Select.Item
								key={option.id}
								value={option.id}
								className={cn(
									'cursor-pointer text-[13px] capitalize transition-colors dark:text-gray-500 font-medium focus:outline-none',
									{
										'text-gray-500 hover:text-black dark:text-gray-500 dark:hover:text-white dark:focus:text-purple':
											option.id !== defaultOption?.id,
										'text-black dark:text-white':
											option.id === defaultOption?.id
									}
								)}
							>
								<Select.ItemText>{option.value}</Select.ItemText>
							</Select.Item>
						))}
					</Select.Viewport>
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
}
