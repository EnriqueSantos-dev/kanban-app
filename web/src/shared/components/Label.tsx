import React from 'react';

import { cn } from '~/utils/cn';

interface LabelTextProps extends React.HTMLAttributes<HTMLLabelElement> {
	label: string;
}

export function Label({ label, className, children }: LabelTextProps) {
	return (
		<label
			className={cn(
				'text-mediumGrey flex cursor-pointer flex-col gap-2 text-sm font-bold first-letter:capitalize dark:text-white',
				className
			)}
		>
			{label}
			{children}
		</label>
	);
}
