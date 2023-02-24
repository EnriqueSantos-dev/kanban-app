import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Label, TextField } from '@/shared/components';
import { useAuthContext } from '@/contexts/auth';
import { AvatarInput } from './AvatarInput';

const RegisterSchema = z
	.object({
		avatar: z.any().optional(),
		name: z.string({ required_error: 'Cannot be empty' }).trim().min(3).max(50),
		email: z.string({ required_error: 'Cannot be empty' }).trim().email(),
		password: z
			.string({ required_error: 'Cannot be empty' })
			.trim()
			.min(6)
			.max(20),
		confirmPassword: z
			.string({ required_error: 'Cannot be empty' })
			.trim()
			.min(6)
			.max(20)
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password not match'
	});

export type FormValues = z.infer<typeof RegisterSchema>;

export function RegisterForm() {
	const { signupMutation } = useAuthContext();
	const {
		register,
		setValue,
		formState: { errors },
		handleSubmit
	} = useForm<FormValues>({
		resolver: zodResolver(RegisterSchema)
	});

	const submitHandler: SubmitHandler<FormValues> = async (data) =>
		signupMutation.mutate(data);

	function handleSetValueAvatar(value: File | null) {
		setValue('avatar', value);
	}

	return (
		<form
			className="flex w-full flex-col gap-3"
			onSubmit={handleSubmit(submitHandler)}
		>
			<AvatarInput setValue={handleSetValueAvatar} {...register('avatar')} />

			<Label label="Name">
				<TextField
					type="text"
					placeholder="Ex: john doe"
					{...register('name')}
					errorMessage={errors.name?.message}
				/>
			</Label>

			<Label label="Email">
				<TextField
					type="text"
					placeholder="Ex: johndoe@gmail.com"
					{...register('email')}
					errorMessage={errors.email?.message}
				/>
			</Label>

			<Label label="Password">
				<TextField
					type="password"
					placeholder="Ex: ********"
					autoComplete="off"
					{...register('password')}
					errorMessage={errors.password?.message}
				/>
			</Label>

			<Label label="Confirm password">
				<TextField
					type="password"
					placeholder="Ex: ********"
					autoComplete="off"
					{...register('confirmPassword')}
					errorMessage={errors.confirmPassword?.message}
				/>
			</Label>

			<button
				type="submit"
				disabled={signupMutation.isLoading}
				className="bg-purple hover:bg-purpleHover hover:ring-purpleHover focus:ring-purpleHover dark:ring-offset-darkGrey mt-3 w-full rounded py-2 px-4 font-bold text-white outline-none ring-2 ring-transparent ring-offset-2 ring-offset-white transition-colors"
			>
				{signupMutation.isLoading && (
					<>
						<svg
							aria-hidden="true"
							role="status"
							className="mr-3 inline h-4 w-4 animate-spin text-white"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="#E5E7EB"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentColor"
							/>
						</svg>
						Loading...
					</>
				)}

				{!signupMutation.isLoading && 'Register'}
			</button>
		</form>
	);
}
