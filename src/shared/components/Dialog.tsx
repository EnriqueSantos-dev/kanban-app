/* eslint-disable react/prop-types */
import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '~/utils/cn';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;
const DialogPortal = DialogPrimitive.Portal;

const DialogHeader = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, children, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		{...props}
		className={cn(
			'mb-6 text-left text-lg font-bold text-black dark:text-white',
			className
		)}
	>
		{children}
	</DialogPrimitive.Title>
));

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
	<DialogPrimitive.Overlay
		className={cn(
			'data-[state=open]:animate-fade-in fixed inset-0 bg-black/50 backdrop-blur-[2px] overflow-y-auto p-4 grid place-items-center',
			className
		)}
		{...props}
		ref={ref}
	>
		{children}
	</DialogPrimitive.Overlay>
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, className, ...props }, ref) => (
	<DialogPrimitive.Content
		className={cn(
			'dark:bg-darkGrey data-[state=open]:animate-fade-in w-[92vw] max-w-[30rem] scale-95 rounded-md bg-white p-8 shadow-sm',
			className
		)}
		{...props}
		ref={ref}
	>
		{children}

		<DialogPrimitive.Close
			title="close dialog"
			arial-aria-label="close dialog add new task"
			className="dark:hover:text-red hover:text-red absolute right-3 top-2 text-black transition dark:text-gray-500 md:hidden"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="text-red drop-shadow-lg"
			>
				<line x1="18" x2="6" y1="6" y2="18" />
				<line x1="6" x2="18" y1="6" y2="18" />
			</svg>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

export {
	Dialog,
	DialogTrigger,
	DialogPortal,
	DialogOverlay,
	DialogHeader,
	DialogContent,
	DialogClose
};
