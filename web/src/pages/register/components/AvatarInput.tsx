import React, { useEffect, useState } from 'react';

import { cn } from '~/utils/cn';

interface AvatarInputProps {
	setValue: (value: File | null) => void;
}

export const AvatarInput = React.forwardRef<HTMLInputElement, AvatarInputProps>(
	({ setValue }, ref) => {
		const [avatar, setAvatar] = useState<File | null>(null);
		const [drag, setDrag] = useState(false);
		const preview = avatar ? URL.createObjectURL(avatar) : null;

		const handleFileChange = (e: FileList | null) => {
			const file = e?.[0];
			if (!file) return;

			setAvatar(file);
		};

		const handleDrop = (e: React.DragEvent<HTMLInputElement>) => {
			e.preventDefault();
			setAvatar(e.dataTransfer.files[0]);
			handleFileChange(e.dataTransfer.files);
		};

		const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
			e.preventDefault();
			setDrag(true);
		};

		const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
			e.preventDefault();
			setDrag(false);
		};

		const handleClearFile = () => {
			setAvatar(null);
			setDrag(false);
		};

		useEffect(() => {
			if (!avatar) return;
			setValue(avatar);
		}, [avatar, setValue]);

		return (
			<div className="mb-2 flex flex-col gap-3">
				<div
					aria-label="drag and drop avatar file"
					className={cn(
						'hover:border-purple focus:border-purple group relative mx-auto grid min-h-[80px] w-full place-content-stretch place-items-center overflow-hidden rounded-md border border-dashed py-2 outline-none transition-colors',
						{
							'max-w-full': !preview,
							'max-w-[200px]': preview,
							'border-linesDark': !drag,
							'border-purple': drag
						}
					)}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
					{preview && (
						<div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full">
							<img
								src={preview}
								alt="avatar user"
								className="h-full max-w-full object-cover"
							/>
						</div>
					)}

					<label
						htmlFor="file-input"
						className={cn(
							'text-mediumGrey group-hover:text-purple group-focus:text-purple flex h-full w-full cursor-pointer items-center justify-center text-xs font-medium transition-colors dark:text-white',
							{
								hidden: preview,
								'text-purple': drag
							}
						)}
					>
						Drag and drop your file here or click to upload
					</label>
					<input
						type="file"
						id="file-input"
						accept="image/*"
						ref={ref}
						hidden
						onChange={({ target: { files } }) => handleFileChange(files)}
					/>
				</div>

				{avatar && (
					<button
						type="button"
						className="ring-offset-0-white bg-mediumGrey hover:ring-mediumGrey focus:ring-mediumGrey dark:ring-offset-darkGrey mx-auto max-w-fit rounded px-3 py-1.5 text-sm text-white outline-none ring-1 ring-transparent ring-offset-1 transition-colors hover:bg-gray-500"
						onClick={handleClearFile}
					>
						Remove file
					</button>
				)}
			</div>
		);
	}
);

AvatarInput.displayName = 'AvatarInput';
