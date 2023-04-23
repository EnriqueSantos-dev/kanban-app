import React, { forwardRef } from 'react';
import { cn } from '~/utils/cn';

interface ButtonRemoveItemFormFormFieldArrayProps
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	isErrorInField?: boolean;
}

export const ButtonRemoveItemFormFormFieldArray = forwardRef<
	HTMLButtonElement,
	ButtonRemoveItemFormFormFieldArrayProps
>(({ className, isErrorInField = false, ...props }, ref) => (
	<button
		type="button"
		ref={ref}
		{...props}
		className={cn(
			'focus:ring-red group shrink-0 p-0.5 focus:outline-none focus:ring-1 focus:ring-offset-1 rounded',
			{
				'my-2': isErrorInField
			},
			className
		)}
	>
		<svg
			className="fill-mediumGrey hover:fill-red group-focus:fill-red w-4 cursor-pointer"
			width="15"
			height="15"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g fillRule="evenodd">
				<path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
				<path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
			</g>
		</svg>
	</button>
));
