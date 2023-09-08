import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ButtonLoading, Label, TextField } from '~/shared/components';
import { AvatarInput } from './AvatarInput';
import { useSignUpMutation } from '~/hooks';

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
	const signupMutation = useSignUpMutation();
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

			<ButtonLoading
				type="submit"
				isLoading={signupMutation.isLoading}
				fallbackText="Saving"
			>
				Register
			</ButtonLoading>
		</form>
	);
}
