import React from 'react';
import { cn } from '@/utils/cn';

interface InputProps
	extends React.DetailedHTMLProps<
		React.InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	errorMessage?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, InputProps>(
	({ errorMessage, ...props }, ref) => (
		<div className="relative flex w-full flex-col gap-2">
			<input
				{...props}
				ref={ref}
				className={cn(
					'hover:ring-purple focus:ring-purple dark:hover:ring-purple dark:focus:ring-purple w-full rounded bg-transparent px-4 py-2 text-xs font-medium text-black outline-none ring-1 transition-colors duration-300 placeholder:text-gray-400  ring-transparent dark:ring-linesDark dark:text-white dark:placeholder:text-lightGrey',
					{
						'ring-red': errorMessage,
						'ring-gray-300': !errorMessage
					}
				)}
			/>
			{errorMessage && (
				<p className="text-red text-xs font-medium">{errorMessage}</p>
			)}
		</div>
	)
);

TextField.displayName = 'TextField';
