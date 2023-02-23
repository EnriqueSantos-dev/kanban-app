interface LabelTextProps {
	label: string;
	children: React.ReactNode;
}

export function Label({ label, children }: LabelTextProps) {
	if (!children) throw new Error('LabelText must have a child');

	return (
		<label className="text-mediumGrey flex flex-col gap-2 text-sm font-bold first-letter:capitalize">
			{label}
			{children}
		</label>
	);
}
