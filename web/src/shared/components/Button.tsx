import React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils';

const buttonVariants = cva(
	'w-full inline-flex items-center justify-center gap-2 px-2 py-1 disabled:opacity-50 h-10 disabled:point font-bold focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-within:ring-offset-darkGrey text-sm focus-visible:outline-none transition-colors',
	{
		variants: {
			variant: {
				purple: 'bg-purple hover:bg-purpleHover text-white ring-purple',
				neutral: 'bg-neutral hover:bg-neutralHover text-purple ring-purple',
				destructive: 'bg-red hover:bg-redHover text-white ring-red'
			},
			rounded: {
				full: 'rounded-full',
				md: 'rounded-md',
				lg: 'rounded-lg'
			}
		},
		defaultVariants: {
			variant: 'purple',
			rounded: 'full'
		}
	}
);

export type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
> &
	VariantProps<typeof buttonVariants>;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, rounded, ...props }, ref) => (
		<button
			// eslint-disable-next-line react/button-has-type
			type={props.type ?? 'button'}
			{...props}
			ref={ref}
			className={cn(
				buttonVariants({
					variant,
					rounded,
					className
				})
			)}
		/>
	)
);

Button.displayName = 'Button';
