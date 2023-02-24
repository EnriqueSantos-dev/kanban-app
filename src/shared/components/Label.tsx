interface LabelTextProps {
	label: string;
	children: React.ReactNode;
}

export function Label({ label, children }: LabelTextProps) {
	return (
		<label className="text-mediumGrey flex flex-col gap-2 text-sm font-bold first-letter:capitalize dark:text-white">
			{label}
			{children}
		</label>
	);
}
