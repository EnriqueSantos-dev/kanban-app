import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

function DialogHeader({ children }: { children: React.ReactNode }) {
	return (
		<DialogPrimitive.Title className="mb-6 text-left text-lg font-bold text-black dark:text-white">
			{children}
		</DialogPrimitive.Title>
	);
}

function DialogOverlay() {
	return (
		<DialogPrimitive.Overlay className="data-[state=open]:animate-fade-in fixed inset-0 bg-black/50" />
	);
}

function DialogContent({ children }: { children: React.ReactNode }) {
	return (
		<DialogPrimitive.Portal>
			<DialogOverlay />
			<DialogPrimitive.Content className="dark:bg-darkGrey data-[state=open]:animate-fade-in data-[state=open]:animate-modal-translate-center focus:ring-purple dark:focus:ring-offset-veryDarkGrey fixed top-1/2 left-1/2 w-[92vw] max-w-[30rem] -translate-x-1/2 translate-y-[-48%] scale-95 rounded-md bg-white p-6 shadow-sm focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-white">
				{children}
			</DialogPrimitive.Content>
		</DialogPrimitive.Portal>
	);
}

export {
	Dialog,
	DialogTrigger,
	DialogOverlay,
	DialogHeader,
	DialogContent,
	DialogClose
};
